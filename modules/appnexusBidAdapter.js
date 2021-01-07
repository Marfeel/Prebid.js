import { registerBidder } from '../src/adapters/bidderFactory.js';
import { specFactory } from '../src/adaptersFactories/appnexusBidAdapterFactory.js';

const BIDDER_CODE = 'appnexus';

const rdRefFactory = (bidderRequest) => encodeURIComponent(bidderRequest.refererInfo.referer);

export const spec = specFactory(BIDDER_CODE, rdRefFactory);

registerBidder(spec);
