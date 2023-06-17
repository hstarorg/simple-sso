'use client';
import { SessionProvider } from 'next-auth/react';

export function ClientWrapper(props: React.PropsWithChildren<{}>) {
  const { children } = props;
  return <SessionProvider>{children}</SessionProvider>;
}
