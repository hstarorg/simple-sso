import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { MainLayoutClient } from './layout.client';
import { PropsWithChildren } from 'react';

export default async function MainLayout(props: PropsWithChildren<{}>) {
  const session = await getServerSession();

  console.log(session);
  if (!session || !session.user) {
    return redirect('/signin');
  }

  return <MainLayoutClient>{props.children}</MainLayoutClient>;
}
