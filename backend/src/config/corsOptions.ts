import type { CorsOptions } from 'cors'

import { env } from '../../env.ts';

const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (!origin || env.CORS_WHITELIST.split(' ') .includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Blocked by CORS policy'));
        }
    }
};

export default corsOptions