'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FormInput } from '../components/ui/form-input';
import { getItem, setItem } from '../utils/localStorage';
import Link from 'next/link';
import { User } from '../types';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const users = getItem('users') || [];
    
    if (users.some((u: User) => u.email === email)) {
      setError('Email already exists');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };

    setItem('users', [...users, newUser]);
    setItem('user', newUser);
    router.push('/info');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-foreground">Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <FormInput
            label="Name"
            value={name}
            onChange={setName}
            required
          />
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
          <Button type="submit" className="w-full">Register</Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}