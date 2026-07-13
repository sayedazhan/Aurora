import type { MemberBalance } from "@/features/finance/balance1/types";
import type { Settlement } from "./types";

type WorkingBalance = {
  memberId: string;
  memberName: string;
  amountCents: number;
};

function toCents(amount: number): number {
  return Math.round(amount * 100);
}

function fromCents(amount: number): number {
  return amount / 100;
}

export function simplifySettlements(
  balances: MemberBalance[]
): Settlement[] {
  const creditors: WorkingBalance[] = balances
    .filter((member) => member.balance > 0)
    .map((member) => ({
      memberId: member.memberId,
      memberName: member.memberName,
      amountCents: toCents(member.balance),
    }))
    .sort((a, b) => b.amountCents - a.amountCents);

  const debtors: WorkingBalance[] = balances
    .filter((member) => member.balance < 0)
    .map((member) => ({
      memberId: member.memberId,
      memberName: member.memberName,
      amountCents: Math.abs(toCents(member.balance)),
    }))
    .sort((a, b) => b.amountCents - a.amountCents);

  const settlements: Settlement[] = [];

  let creditorIndex = 0;
  let debtorIndex = 0;

  while (
    creditorIndex < creditors.length &&
    debtorIndex < debtors.length
  ) {
    const creditor = creditors[creditorIndex];
    const debtor = debtors[debtorIndex];

    const settlementAmount = Math.min(
      creditor.amountCents,
      debtor.amountCents
    );

    if (settlementAmount > 0) {
      settlements.push({
        fromMemberId: debtor.memberId,
        fromMemberName: debtor.memberName,
        toMemberId: creditor.memberId,
        toMemberName: creditor.memberName,
        amount: fromCents(settlementAmount),
      });
    }

    creditor.amountCents -= settlementAmount;
    debtor.amountCents -= settlementAmount;

    if (creditor.amountCents === 0) {
      creditorIndex += 1;
    }

    if (debtor.amountCents === 0) {
      debtorIndex += 1;
    }
  }

  return settlements;
}