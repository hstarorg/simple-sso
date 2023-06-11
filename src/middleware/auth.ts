import { createEdgeRouter, expressWrapper } from 'next-connect';
import { NextFetchEvent, NextRequest } from 'next/server';
import passport from 'passport';

const router = createEdgeRouter<NextRequest, NextFetchEvent>();

// router
//   .use(expressWrapper(passport.initialize()))
//   .use(expressWrapper(passport.session()));

router.use(async (req, event, next) => {
  const start = Date.now();
  await next(); // call next in chain
  const end = Date.now();
  console.log(`Request took ${end - start}ms`);
});

export { router };
// const auth = nextConnect()
// .use(
//   session({
//     name: 'sess',
//     secret: process.env.TOKEN_SECRET,
//     cookie: {
//       maxAge: 60 * 60 * 8, // 8 hours,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       path: '/',
//       sameSite: 'lax',
//     },
//   }),
// )
// .use((req, res, next) => {
//   // Initialize mocked database
//   // Remove this after you add your own database
//   req.session.users = req.session.users || [];
//   next();
// })
// .use(passport.initialize())
// .use(passport.session());

// export default auth;
