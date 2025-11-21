import type { Fount, SpellbookEntry } from "../types/p9";
import { apiClient } from "./client";

export interface ListFountsResponse {
  founts: Fount[];
}

export interface GetFountResponse {
  fount: Fount;
}

export interface SpellbookResponse {
  spellbook: SpellbookEntry[];
}

export function listFounts(): Promise<ListFountsResponse> {
  return apiClient.castSpell<ListFountsResponse>("listFounts");
}

export function getFount(fountId: string): Promise<GetFountResponse> {
  return apiClient.castSpell<GetFountResponse>("getFount", { fount_id: fountId });
}

export function getSpellbook(pubKey: string): Promise<SpellbookResponse> {
  return apiClient.get<SpellbookResponse>(`/spellbook/${pubKey}`);
}
