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

      NODE_ENV?: "development" | "production";
    }
  }
}

import 'fastify';

declare module 'fastify' {
  interface FastifyReply {
    locals: { userId?: number, tokenId?: number }
  }
}

export type Req = FastifyRequest<RouteGenericInterface, Http2SecureServer, Http2ServerRequest, FastifySchema, FastifyTypeProviderDefault, unknown, FastifyBaseLogger, ResolveFastifyRequestType<>>;
export type Res = FastifyReply<Http2SecureServer, Http2ServerRequest, Http2ServerResponse, RouteGenericInterface, unknown, FastifySchema, FastifyTypeProviderDefault, unknown>;