import type {
  BalanceExpense,
  BalanceMember,
  MemberBalance,
} from "./types";

function toCents(amount: number): number {
  return Math.round(amount * 100);
}

function fromCents(amount: number): number {
  return amount / 100;
}

export function calculateBalances(
  members: BalanceMember[],
  expenses: BalanceExpense[]
): MemberBalance[] {
  const balanceMap = new Map<
    string,
    {
      memberName: string;
      totalPaidCents: number;
      totalOwedCents: number;
    }
  >();

  for (const member of members) {
    balanceMap.set(member.id, {
      memberName: member.name,
      totalPaidCents: 0,
      totalOwedCents: 0,
    });
  }

  for (const expense of expenses) {
    const payer = balanceMap.get(expense.paidByMemberId);

    if (payer) {
      payer.totalPaidCents += toCents(expense.amount);
    }

    for (const split of expense.splits) {
      const participant = balanceMap.get(split.memberId);

      if (participant) {
        participant.totalOwedCents += toCents(split.amount);
      }
    }
  }

  return Array.from(balanceMap.entries())
    .map(([memberId, value]) => {
      const balanceCents =
        value.totalPaidCents - value.totalOwedCents;

      return {
        memberId,
        memberName: value.memberName,
        totalPaid: fromCents(value.totalPaidCents),
        totalOwed: fromCents(value.totalOwedCents),
        balance: fromCents(balanceCents),
      };
    })
    .sort((a, b) => b.balance - a.balance);
}