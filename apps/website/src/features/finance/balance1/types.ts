export type BalanceMember = {
  id: string;
  name: string;
};

export type BalanceExpenseSplit = {
  memberId: string;
  amount: number;
};

export type BalanceExpense = {
  id: string;
  paidByMemberId: string;
  amount: number;
  splits: BalanceExpenseSplit[];
};

export type MemberBalance = {
  memberId: string;
  memberName: string;
  totalPaid: number;
  totalOwed: number;
  balance: number;
};