import { NextFetchEvent, NextRequest } from 'next/server';

import { createEdgeRouter, createRouter, expressWrapper } from 'next-connect';
import passport from 'passport';

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

router
  // A middleware example
  .use(async (req, event, next) => {
    const start = Date.now();
    await next(); // call next in chain
    const end = Date.now();
    console.log(`Request took ${end - start}ms`);
  })

// const router = createEdgeRouter<NextRequest, NextFetchEvent>();
// const router = createRouter();

// router
//   .use(expressWrapper(passport.initialize()))
//   .use(expressWrapper(passport.session()));

// router.use(async (req, event, next) => {
//   const start = Date.now();
//   await next(); // call next in chain
//   const end = Date.now();
//   console.log(`Request took ${end - start}ms`);
// });

export async function GET(request: NextRequest, ctx: RequestContext) {
  console.log('abcde');

  return router.run(request, ctx);
}
