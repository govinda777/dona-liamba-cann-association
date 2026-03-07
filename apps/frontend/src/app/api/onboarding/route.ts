import { db } from '@/lib/db';
import { onboardingUsers } from '@/lib/schema';
import { NextResponse } from 'next/server';
import { eq, and } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const walletAddress = searchParams.get('walletAddress');
  const role = searchParams.get('role');

  if (!walletAddress || !role) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const user = await db.select()
      .from(onboardingUsers)
      .where(and(
        eq(onboardingUsers.walletAddress, walletAddress),
        eq(onboardingUsers.role, role)
      ))
      .limit(1);

    return NextResponse.json(user[0] || null);
  } catch (error) {
    console.error('Fetch onboarding error:', error);
    return NextResponse.json({ error: 'Failed to fetch onboarding status' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { walletAddress, role, step, data } = await request.json();

  try {
    const existing = await db.select()
      .from(onboardingUsers)
      .where(and(
        eq(onboardingUsers.walletAddress, walletAddress),
        eq(onboardingUsers.role, role)
      ))
      .limit(1);

    if (existing.length > 0) {
      await db.update(onboardingUsers)
        .set({ step, data: { ...(existing[0].data as object), ...data }, updatedAt: new Date() })
        .where(eq(onboardingUsers.id, existing[0].id));
      return NextResponse.json({ message: 'Updated' });
    } else {
      await db.insert(onboardingUsers).values({
        walletAddress,
        role,
        step,
        data,
      });
      return NextResponse.json({ message: 'Created' });
    }
  } catch (error) {
    console.error('Onboarding error:', error);
    return NextResponse.json({ error: 'Failed to save onboarding' }, { status: 500 });
  }
}
