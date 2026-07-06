import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';
export async function GET() { return NextResponse.json({ transactions: await prisma.transaction.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }) }); }
