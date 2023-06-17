'use client';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';

export default function AuthPage({ params, searchParams }: any) {
  const provider = params.provider;

  useEffect(() => {
    signIn(provider);
  }, []);

  return null;
}
