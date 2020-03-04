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

import { filterBidsBySizes } from './marfeelTools';

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
  });
});
