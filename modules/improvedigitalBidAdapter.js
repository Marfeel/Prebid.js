import { registerBidder } from '../src/adapters/bidderFactory.js';
import { specFactory } from '../src/adaptersFactories/improveDigitalBidAdapterFactory.js';

const BIDDER_CODE = 'improvedigital';

const getReferrer = (bidderRequest) => bidderRequest.refererInfo.referer;

export const spec = specFactory(BIDDER_CODE, getReferrer);

registerBidder(spec);
