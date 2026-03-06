import { db } from '@/lib/db';
import { leads } from '@/lib/schema';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await db.insert(leads).values({ email });

    return NextResponse.json({ message: 'Lead captured successfully' });
  } catch (error) {
    console.error('Error capturing lead:', error);
    return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 });
  }
}
