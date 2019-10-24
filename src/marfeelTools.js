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

var lastLocation;

export const getLastLocation = () => lastLocation;

export const setLastLocationFromLastAdUnit = (adUnitArr) => {
  try {
    if (utils.isArray(adUnitArr)) {
      lastLocation = adUnitArr[0].bids[0].params.referrer;
    } else {
      lastLocation = adUnitArr.bids[0].params.referrer;
    }
  } catch (error) {
    console.error('Error while extracting lastLocation from adUnit', error);
  }
}
