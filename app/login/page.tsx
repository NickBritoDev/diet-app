'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FormInput } from '../components/ui/form-input';
import { getItem, setItem } from '../utils/localStorage';
import Link from 'next/link';
import { User } from '../types';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = getItem('users') || [];
    const user = users.find((u: User) => u.email === email && u.password === password);

    if (user) {
      setItem('user', user);
      const userInfo = getItem('userInfo');
      if (userInfo) {
        router.push('/profile');
      } else {
        router.push('/info');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-foreground">Diet App</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <FormInput
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            required
          />
          <FormInput
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            required
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button type="submit" className="w-full">Login</Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          {`Don't have an account?`}{' '}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}