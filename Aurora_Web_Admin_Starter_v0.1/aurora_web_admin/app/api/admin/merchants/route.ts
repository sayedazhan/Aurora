import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';
export async function GET() { return NextResponse.json({ merchants: await prisma.merchant.findMany({ orderBy: { createdAt: 'desc' }, take: 100, include: { stores: true } }) }); }
