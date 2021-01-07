import { registerBidder } from '../src/adapters/bidderFactory.js';
import { specFactory } from '../src/adaptersFactories/pubmaticBidAdapterFactory.js';

const BIDDER_CODE = 'pubmatic';

export const spec = specFactory(BIDDER_CODE);

registerBidder(spec);
