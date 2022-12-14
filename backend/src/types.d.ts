declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST?: string;
      DB_PORT?: string;
      DB_NAME?: string;
      DB_USER?: string;
      DB_PASSWORD?: string;
      DB_CON_LIMIT?: string;

      PORT?: string;
    }
  }
}

import 'express';

declare module 'express' {
  export interface Response {
    locals: {
      userId?: number
      tokenId?: number
    };
  }
}

export { }