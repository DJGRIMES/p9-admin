import type { Pref } from "../types/p9";
import { apiClient } from "./client";

export interface PrefResponse {
  pref: Pref;
}

export function fetchPreferences(fountId: string): Promise<PrefResponse> {
  return apiClient.castSpell<PrefResponse>("getPreferences", { fount_id: fountId });
}
