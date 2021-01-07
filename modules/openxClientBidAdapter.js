import { registerBidder } from '../src/adapters/bidderFactory.js';
import { specFactory } from '../src/adaptersFactories/openxBidAdapterFactory.js';

const BIDDER_CODE = 'openx_client';

export const spec = specFactory(BIDDER_CODE);

registerBidder(spec);
