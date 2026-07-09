import { equalSplit } from "./EqualSplit";

export function splitExpenseEqual(amount: number, userIds: string[]) {
  if (userIds.length === 0) {
    throw new Error("At least one participant is required.");
  }

  return equalSplit({
    amount,
    userIds,
  });
}