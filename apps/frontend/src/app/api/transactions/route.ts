import { db } from '@/lib/db';
import { transactions } from '@/lib/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userAddress = searchParams.get('userAddress');

  if (!userAddress) {
    return NextResponse.json({ error: 'Missing userAddress' }, { status: 400 });
  }

  try {
    const data = await db.select()
      .from(transactions)
      .where(eq(transactions.userAddress, userAddress));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Fetch transactions error:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await db.insert(transactions).values(body);
    return NextResponse.json({ message: 'Transaction saved' });
  } catch (error) {
    console.error('Save transaction error:', error);
    return NextResponse.json({ error: 'Failed to save transaction' }, { status: 500 });
  }
}
