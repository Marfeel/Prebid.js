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
const CONSTANTS = require('./constants.json');

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

export const isBidCached = (bid) => bid[CONSTANTS.JSON_MAPPING.ADSERVER_TARGETING][CONSTANTS.TARGETING_KEYS.CACHED];

export const getBidName = (bid) => bid[CONSTANTS.JSON_MAPPING.ADSERVER_TARGETING][CONSTANTS.TARGETING_KEYS.BIDDER];
