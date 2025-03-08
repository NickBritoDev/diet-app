'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getItem } from './utils/localStorage';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = getItem('user');
    if (user) {
      const userInfo = getItem('userInfo');
      if (userInfo) {
        router.push('/profile');
      } else {
        router.push('/info');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  return null;
}