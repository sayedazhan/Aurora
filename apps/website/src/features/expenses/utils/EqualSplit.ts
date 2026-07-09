export type EqualSplitInput = {
  amount: number;
  userIds: string[];
};

export type SplitResult = {
  user_id: string;
  amount: number;
};

export function equalSplit({
  amount,
  userIds,
}: EqualSplitInput): SplitResult[] {
  const count = userIds.length;

  if (count === 0) {
    return [];
  }

  // Work in cents to avoid floating-point errors
  const totalCents = Math.round(amount * 100);

  const baseShare = Math.floor(totalCents / count);
  const remainder = totalCents % count;

  return userIds.map((userId, index) => ({
    user_id: userId,
    amount: (baseShare + (index < remainder ? 1 : 0)) / 100,
  }));
}