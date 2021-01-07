import { registerBidder } from '../src/adapters/bidderFactory.js';
import { specFactory } from '../src/adaptersFactories/rubiconBidAdapterFactory.js';

const BIDDER_CODE = 'rubicon';

export const spec = specFactory(BIDDER_CODE);

registerBidder(spec);
