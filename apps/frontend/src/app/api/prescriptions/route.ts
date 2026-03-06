import { db } from '@/lib/db';
import { prescriptionsMetadata } from '@/lib/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const patientAddress = searchParams.get('patientAddress');

  if (!patientAddress) {
    return NextResponse.json({ error: 'Missing patientAddress' }, { status: 400 });
  }

  try {
    const data = await db.select()
      .from(prescriptionsMetadata)
      .where(eq(prescriptionsMetadata.patientAddress, patientAddress));

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch prescriptions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await db.insert(prescriptionsMetadata).values(body);
    return NextResponse.json({ message: 'Prescription metadata saved' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save prescription' }, { status: 500 });
  }
}
