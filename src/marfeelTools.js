/*
 * Copyright (c) 2019 by Marfeel Solutions (http://www.marfeel.com)
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Marfeel Solutions S.L and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Marfeel Solutions S.L and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Marfeel Solutions SL.
 */

const utils = require('./utils.js');
const { auctionManager } = require('./auctionManager');

var lastLocation;

export const getLastLocation = () => lastLocation;

const extractLastLocationFromArray = (adUnitArr) => (
  adUnitArr &&
  adUnitArr[0] &&
  adUnitArr[0].bids &&
  adUnitArr[0].bids[0] &&
  adUnitArr[0].bids[0].params &&
  adUnitArr[0].bids[0].params.referrer) ? adUnitArr[0].bids[0].params.referrer : '';

const extractLastLocationFromObject = (adUnitArr) => (
  adUnitArr &&
  adUnitArr.bids &&
  adUnitArr.bids[0] &&
  adUnitArr.bids[0].params &&
  adUnitArr.bids[0].params.referrer) ? adUnitArr.bids[0].params.referrer : '';

export const setLastLocationFromLastAdUnit = (adUnitArr) => {
  if (utils.isArray(adUnitArr)) {
    lastLocation = extractLastLocationFromArray(adUnitArr);
  } else {
    lastLocation = extractLastLocationFromObject(adUnitArr);
  }
}

export const getLastAuctionSizes = () => {
  const lastAdUnitUsed = [...auctionManager.getAdUnits()].pop();

  if (lastAdUnitUsed &&
      lastAdUnitUsed.mediaTypes &&
      lastAdUnitUsed.mediaTypes['banner'] &&
      lastAdUnitUsed.mediaTypes['banner'].sizes
  ) {
    return lastAdUnitUsed.mediaTypes['banner'].sizes;
  }

  return [];
}

const SIZE_JOINER = 'x';

export const filterBidsBySizes = (sizesToFilter) => {
  const sizesToFilterUnified = sizesToFilter.map(sizes => sizes.join(SIZE_JOINER));

  return (bid) => {
    const bidSize = [bid.width, bid.height].join(SIZE_JOINER);

    return sizesToFilterUnified.includes(bidSize);
  }
}
