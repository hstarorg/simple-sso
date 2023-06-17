import { NextResponse, NextRequest } from 'next/server';
import { doNormalLogin } from '@/server/bizs/testBiz';
import { sessionStore, util } from '@/server/utils';

/**
 * POST /login
 * @param request
 * @returns
 */
export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const user = await doNormalLogin(reqBody);
  if (user) {
    const sid = util.buildCode();
    sessionStore.set(sid, user);

    const res = NextResponse.json(
      {
        success: true,
        message: 'ok',
        data: null,
      },
      { status: 200 },
    );
    res.cookies.set('sid', sid);
    return res;
  }
}
