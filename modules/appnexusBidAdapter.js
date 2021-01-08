import { registerBidder } from '../src/adapters/bidderFactory.js';
import { specFactory } from '../src/adaptersFactories/appnexusBidAdapterFactory.js';

const BIDDER_CODE = 'appnexus';
const IS_SERVER_BIDDER = true;

export const spec = specFactory(BIDDER_CODE, IS_SERVER_BIDDER);

registerBidder(spec);
