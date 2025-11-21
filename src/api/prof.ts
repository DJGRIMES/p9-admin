import type { Prof } from "../types/p9";
import { apiClient } from "./client";

export interface ProfResponse {
  profile: Prof;
}

export function fetchProfile(fountId: string): Promise<ProfResponse> {
  return apiClient.castSpell<ProfResponse>("getProfile", { fount_id: fountId });
}
