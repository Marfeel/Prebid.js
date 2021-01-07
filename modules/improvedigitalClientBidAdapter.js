import * as tools from '../src/marfeelTools.js';
import { registerBidder } from '../src/adapters/bidderFactory.js';
import { specFactory } from '../src/adaptersFactories/improveDigitalBidAdapterFactory.js';

const BIDDER_CODE = 'improvedigital_client';

const getReferrer = (bidderRequest, bidRequests) => tools.getPageUrl(bidRequests[0], bidderRequest);

export const spec = specFactory(BIDDER_CODE, getReferrer);

registerBidder(spec);
