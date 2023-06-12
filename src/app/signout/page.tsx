import { sessionStore } from '@/server/utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function SignOut() {
  const cookieStore = cookies();
  const sid = cookieStore.get('sid')?.value;

  sessionStore.delete(sid!);
  return redirect('/signin');
}
