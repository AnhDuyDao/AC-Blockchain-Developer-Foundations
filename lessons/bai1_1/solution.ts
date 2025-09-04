import { createHash } from "crypto";
export type Block = {
  index: number;
  timestamp: string;
  transactions: any[];
  previous_hash: string;
  current_hash: string;
};

// ✍️ TODO: Viết hàm tại đây
export function isValidBlock(block: Block): boolean {
  const { index, timestamp, transactions, previous_hash, current_hash } = block;
  const blockString = `${index}${timestamp}${JSON.stringify(
    transactions
  )}${previous_hash}`;
  const hash = createHash("sha256").update(blockString).digest("hex");
  if (hash === current_hash) {
    return true; // Chỉnh lại logic
  }
  return false; // Chỉnh lại logic
}
