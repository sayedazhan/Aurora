import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.riskEvent.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.groupMember.deleteMany();
  await prisma.group.deleteMany();
  await prisma.merchantStore.deleteMany();
  await prisma.merchant.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.user.deleteMany();
  await prisma.lead.deleteMany();

  const users = await Promise.all([
    prisma.user.create({ data: { fullName: 'Azhan Hassan', email: 'azhan@example.com', phone: '+61412345678', handle: '@azhan', status: 'ACTIVE', kycStatus: 'APPROVED' } }),
    prisma.user.create({ data: { fullName: 'Sarah Johnson', email: 'sarah@example.com', phone: '+61411111111', handle: '@sarah', status: 'ACTIVE', kycStatus: 'APPROVED' } }),
    prisma.user.create({ data: { fullName: 'Jason Lee', email: 'jason@example.com', phone: '+61422222222', handle: '@jason', status: 'ACTIVE', kycStatus: 'APPROVED' } }),
    prisma.user.create({ data: { fullName: 'Mia Chen', email: 'mia@example.com', phone: '+61433333333', handle: '@mia', status: 'PENDING_KYC', kycStatus: 'MANUAL_REVIEW' } })
  ]);

  const wallet = await prisma.wallet.create({ data: { userId: users[0].id, label: 'Main Wallet', balanceCents: 428015, maskedRef: '•••• 5678' } });

  const merchant = await prisma.merchant.create({ data: { businessName: 'Northside Coffee Cart', abn: '12345678901', contactEmail: 'owner@northside.example', category: 'Cafe', status: 'ACTIVE' } });
  await prisma.merchantStore.create({ data: { merchantId: merchant.id, name: 'Northside Melbourne', suburb: 'Melbourne', state: 'VIC', qrCode: 'AURORA-QR-NORTHSIDE-001' } });

  const tx1 = await prisma.transaction.create({ data: { reference: 'AUR-2026-0001', type: 'P2P_SEND', status: 'COMPLETED', amountCents: 4500, senderId: users[0].id, receiverId: users[1].id, walletId: wallet.id, description: 'Dinner last night', completedAt: new Date() } });
  await prisma.transaction.create({ data: { reference: 'AUR-2026-0002', type: 'QR_PAYMENT', status: 'COMPLETED', amountCents: 650, senderId: users[0].id, merchantId: merchant.id, walletId: wallet.id, description: 'Flat white', completedAt: new Date() } });
  const tx3 = await prisma.transaction.create({ data: { reference: 'AUR-2026-0003', type: 'REQUEST_PAYMENT', status: 'REVIEW', amountCents: 2400, senderId: users[1].id, receiverId: users[0].id, description: 'Trip settlement' } });

  const group = await prisma.group.create({ data: { name: 'Japan Trip', purpose: 'Travel' } });
  await prisma.groupMember.createMany({ data: users.slice(0,3).map((u) => ({ groupId: group.id, userId: u.id })) });
  await prisma.expense.create({ data: { groupId: group.id, title: 'Hotel deposit', amountCents: 78000, paidBy: users[0].id } });

  await prisma.riskEvent.create({ data: { transactionId: tx3.id, level: 'MEDIUM', reason: 'New counterparty and unusual request pattern' } });
  await prisma.riskEvent.create({ data: { transactionId: tx1.id, level: 'LOW', reason: 'First P2P payment for receiver' } });

  await prisma.lead.createMany({ data: [
    { name: 'Pilot Merchant', email: 'pilot@example.com', segment: 'Merchant' },
    { name: 'Early User', email: 'early@example.com', segment: 'Consumer' }
  ] });

  await prisma.auditLog.create({ data: { actorUserId: users[0].id, action: 'seed.created', entityType: 'system', metadata: { source: 'prisma/seed.ts' } } });
}

main().finally(async () => prisma.$disconnect());
