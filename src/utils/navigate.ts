'use server';
import { redirect } from 'next/navigation';

export const navigate = (route: string) => {
  redirect(route);
};
