import type { InviteToken } from "../types/p9";
import { apiClient } from "./client";

export interface MintInviteRequest {
  count: number;
  sponsor_fount_id: string;
  context?: {
    type?: string;
    label?: string | null;
    note?: string | null;
  };
  hints?: {
    email_suggestion?: string | null;
    source?: string | null;
  };
  expires_at?: string | null;
}

export interface MintInviteResponse {
  invites: InviteToken[];
}

export interface InviteListResponse {
  invites: InviteToken[];
}

export interface InviteResponse {
  invite: InviteToken;
}

export async function mintInvites(
  payload: MintInviteRequest
): Promise<MintInviteResponse> {
  return apiClient.castSpell<MintInviteResponse>("mintInvites", payload);
}

export function listInvites(): Promise<InviteListResponse> {
  return apiClient.castSpell<InviteListResponse>("listInvites");
}

export function fetchInvite(inviteId: string): Promise<InviteResponse> {
  return apiClient.castSpell<InviteResponse>("getInvite", { invite_id: inviteId });
}
