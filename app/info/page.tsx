'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FormInput } from '../components/ui/form-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getItem, setItem } from '../utils/localStorage';
import { UserInfo } from '../types';

export default function Info() {
  const router = useRouter();
  const [info, setInfo] = useState<Partial<UserInfo>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setItem('userInfo', info);
    router.push('/profile');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-foreground">Personal Information</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Height (cm)"
            type="number"
            value={info.height || ''}
            onChange={(value) => setInfo({ ...info, height: Number(value) })}
            required
          />
          <FormInput
            label="Weight (kg)"
            type="number"
            value={info.weight || ''}
            onChange={(value) => setInfo({ ...info, weight: Number(value) })}
            required
          />
          <FormInput
            label="Age"
            type="number"
            value={info.age || ''}
            onChange={(value) => setInfo({ ...info, age: Number(value) })}
            required
          />
          <div className="space-y-2">
            <label className="text-sm font-medium">Gender</label>
            <Select onValueChange={(value) => setInfo({ ...info, gender: value as 'male' | 'female' })}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Activity Level</label>
            <Select onValueChange={(value) => setInfo({ ...info, activityLevel: value as UserInfo['activityLevel'] })}>
              <SelectTrigger>
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary</SelectItem>
                <SelectItem value="light">Light Exercise</SelectItem>
                <SelectItem value="moderate">Moderate Exercise</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="very-active">Very Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Goal</label>
            <Select onValueChange={(value) => setInfo({ ...info, goal: value as 'lose' | 'maintain' | 'gain' })}>
              <SelectTrigger>
                <SelectValue placeholder="Select goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lose">Lose Weight</SelectItem>
                <SelectItem value="maintain">Maintain Weight</SelectItem>
                <SelectItem value="gain">Gain Weight</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <FormInput
            label="Target Weight (kg)"
            type="number"
            value={info.targetWeight || ''}
            onChange={(value) => setInfo({ ...info, targetWeight: Number(value) })}
            required
          />
          <Button type="submit" className="w-full">Save Information</Button>
        </form>
      </div>
    </div>
  );
}