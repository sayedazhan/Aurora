import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const LeadSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  segment: z.string().optional(),
  message: z.string().optional()
});

export async function POST(request: Request) {
  const form = await request.formData();
  const parsed = LeadSchema.safeParse(Object.fromEntries(form.entries()));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid lead details' }, { status: 400 });
  await prisma.lead.create({ data: parsed.data });
  return NextResponse.redirect(new URL('/?joined=true', request.url));
}

export async function GET() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
  return NextResponse.json({ leads });
}
