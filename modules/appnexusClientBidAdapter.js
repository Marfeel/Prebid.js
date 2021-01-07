import * as tools from '../src/marfeelTools.js';
import { registerBidder } from '../src/adapters/bidderFactory.js';
import { specFactory } from '../src/adaptersFactories/appnexusBidAdapterFactory.js';

const BIDDER_CODE = 'appnexus_client';

const rdRefFactory = (bidderRequest, bidRequests) => encodeURIComponent(tools.getPageUrl(bidRequests[0], bidderRequest));

export const spec = specFactory(BIDDER_CODE, rdRefFactory);

registerBidder(spec);
