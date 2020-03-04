/*
 * Copyright (c) 2020 by Marfeel Solutions (http://www.marfeel.com)
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

import { isBidSizeAllowed, add1x1IfAllowed } from './marfeelTools';
import { auctionManager } from './auctionManager';

describe('marfeelTools', function () {
  describe('isBidSizeAllowed', function() {
    it('filter bids within the proper sizes', function () {
      const bidsToFilter = [{
        height: 100,
        width: 200
      }, {
        height: 200,
        width: 300
      }, {
        height: 100,
        width: 50
      }, {
        height: 200,
        width: 200
      }];
      const sizesToFilter = [[100, 200], [200, 200]];
      const bidsFiltered = bidsToFilter.filter(bid => isBidSizeAllowed(bid, sizesToFilter));

      assert.deepEqual(bidsFiltered, [{
        height: 100,
        width: 200
      }, {
        height: 200,
        width: 200
      }])
    });

    it('adds 1x1 to allowed sizes if 300x250 is present', function() {
      const currentSizes = [[100, 100], [300, 150], [300, 250]];
      const fakeGetAdUnits = () => [{
        mediaTypes: {
          banner: {
            sizes: currentSizes
          }
        }
      }];
      sinon.replace(auctionManager, 'getAdUnits', fakeGetAdUnits);
      const expectedSizes = [[100, 100], [300, 150], [300, 250], [1, 1]];

      assert.deepEqual(getAllowedSizes(), expectedSizes);
    });
  });
});
