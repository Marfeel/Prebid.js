/* Secure Creatives
  Provides support for rendering creatives into cross domain iframes such as SafeFrame to prevent
   access to a publisher page from creative payloads.
 */

import events from './events';
import { fireNativeTrackers } from './native';
import { EVENTS } from './constants';
import { isSlotMatchingAdUnitCode, logWarn } from './utils';
import { auctionManager } from './auctionManager';
import find from 'core-js/library/fn/array/find';

const BID_WON = EVENTS.BID_WON;
const ERROR_SECURE_CREATIVE = EVENTS.ERROR_SECURE_CREATIVE;

export function listenMessagesFromCreative() {
  addEventListener('message', receiveMessage, false);
}

function receiveMessage(ev) {
  var key = ev.message ? 'message' : 'data';
  var data = {};
  try {
    data = JSON.parse(ev[key]);
  } catch (e) {
    return;
  }

  if (data && data.adId) {
    const adObject = find(auctionManager.getBidsReceived(), function(bid) {
      return bid.adId === data.adId;
    });

    if (data.message === 'Prebid Request') {
      if (data.adServerDomain === null) {
        events.emit(ERROR_SECURE_CREATIVE, {
          msg: 'adServerDomain is null',
          data,
          adObject,
          source: ev.source
        });
      }
      if (typeof ev.source === 'undefined') {
        events.emit(ERROR_SECURE_CREATIVE, {
          msg: 'event source is undefined',
          data,
          adObject
        });
      }
      if (typeof adObject === 'undefined') {
        events.emit(ERROR_SECURE_CREATIVE, {
          msg: 'adObject is undefined',
          data,
          source: ev.source
        });
      }

      if (typeof ev.source !== 'undefined') {
        sendAdToCreative(adObject, data.adServerDomain, ev.source);

        // save winning bids
        auctionManager.addWinningBid(adObject);

        events.emit(BID_WON, adObject);
      } else {
        events.emit(ERROR_SECURE_CREATIVE, {
          msg: 'Target Safeframe removed from the DOM before display'
        });
      }
    }

    // handle this script from native template in an ad server
    // window.parent.postMessage(JSON.stringify({
    //   message: 'Prebid Native',
    //   adId: '%%PATTERN:hb_adid%%'
    // }), '*');
    if (data.message === 'Prebid Native') {
      fireNativeTrackers(data, adObject);
      auctionManager.addWinningBid(adObject);
      events.emit(BID_WON, adObject);
    }
  }
}

function sendAdToCreative(adObject, remoteDomain, source) {
  const { adId, ad, adUrl, width, height } = adObject;

  if (adId) {
    resizeRemoteCreative(adObject);
    source.postMessage(
      JSON.stringify({
        message: 'Prebid Response',
        ad,
        adUrl,
        adId,
        width,
        height
      }),
      remoteDomain
    );
  }
}

function resizeRemoteCreative({ adUnitCode, width, height }) {
  // resize both container div + iframe
  ['div', 'iframe'].forEach(elmType => {
    const nestedElement = getElementByAdUnit(elmType);
    if (typeof nestedElement !== 'undefined') {
      if (nestedElement === null) {
        events.emit(ERROR_SECURE_CREATIVE, {
          msg: 'No element of type "elmType" for adUnit',
          adUnitCode,
          elmType,
          width,
          height
        });
      } else {
        let elementStyle = nestedElement.style;
        elementStyle.width = `${width}px`;
        elementStyle.height = `${height}px`;
      }
    }
  });

  function getElementByAdUnit(elmType) {
    const containerElement = document.getElementById(
      find(
        window.googletag
          .pubads()
          .getSlots()
          .filter(isSlotMatchingAdUnitCode(adUnitCode)),
        slot => slot
      ).getSlotElementId()
    );

    if (containerElement === null) {
      events.emit(ERROR_SECURE_CREATIVE, {
        msg: 'No element for adUnit',
        adUnitCode,
        elmType,
        slotsOnPage: window.googletag.pubads().getSlots().length
      });
      return;
    }
    return containerElement.querySelector(elmType);
  }
}
