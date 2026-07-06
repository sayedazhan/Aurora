import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const [userCount, merchantCount, txCount, volume, openRisk] = await Promise.all([
    prisma.user.count(),
    prisma.merchant.count(),
    prisma.transaction.count(),
    prisma.transaction.aggregate({ _sum: { amountCents: true }, where: { status: 'COMPLETED' } }),
    prisma.riskEvent.count({ where: { status: 'open' } })
  ]);
  return NextResponse.json({ userCount, merchantCount, txCount, volumeCents: volume._sum.amountCents ?? 0, openRisk });
}
