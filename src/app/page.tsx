import { sessionStore } from '@/server/utils';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { UserHome } from './_partials/UserHome';

export default function Home() {
  const cookieStore = cookies();
  const sid = cookieStore.get('sid')?.value;
  const sessionUser = sessionStore.get(sid || '');

  // 没有登录就跳转到登录界面
  if (!sessionUser) {
    return redirect('/signin');
  }

  return <UserHome />;
}
