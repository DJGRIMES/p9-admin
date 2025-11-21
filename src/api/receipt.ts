import type { Receipt } from "../types/p9";
import { apiClient } from "./client";

export interface ReceiptListResponse {
  receipts: Receipt[];
}

export interface ReceiptResponse {
  receipt: Receipt;
}

export function listReceipts(): Promise<ReceiptListResponse> {
  return apiClient.castSpell<ReceiptListResponse>("listReceipts");
}

export function fetchReceipt(receiptId: string): Promise<ReceiptResponse> {
  return apiClient.castSpell<ReceiptResponse>("getReceipt", { receipt_id: receiptId });
}
