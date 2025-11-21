export type FountState = "active" | "disabled";

export interface Fount {
  id: string; // fount_UUID
  public_key: string;
  state: FountState;
  metadata?: {
    origin?: string;      // e.g. "invite_token"
    origin_ref?: string;  // e.g. inv_UUID
    notes?: string | null;
  };
  created_at?: string;
  updated_at?: string;
}

export interface Pref {
  id: string;       // pref_UUID
  fount_id: string; // link to Fount
  settings: {
    language?: string;
    timezone?: string;
    experiment_flags?: string[];
    ui?: {
      theme?: "light" | "dark";
      beta_features_enabled?: boolean;
    };
    [key: string]: any;
  };
  created_at?: string;
  updated_at?: string;
}

export interface Prof {
  id: string;       // prof_UUID
  fount_id: string; // link to Fount
  profile: {
    display_name?: string | null;
    avatar_url?: string | null;
    bio?: string | null;
    tags?: string[];
    is_partial: boolean;
  };
  created_at?: string;
  updated_at?: string;
}

export type InviteStatus = "unclaimed" | "claimed" | "expired" | "revoked";

export interface InviteToken {
  id: string; // inv_UUID
  short_code: string;
  emoji_code?: string;
  qr_payload?: string;
  status: InviteStatus;
  sponsor_fount_id: string;
  claimed_fount_id?: string | null;
  context?: {
    type?: string;  // e.g. "admin_invite"
    label?: string | null;
    note?: string | null;
  };
  hints?: {
    email_suggestion?: string | null;
    source?: string | null;
  };
  audit?: {
    minted_by?: string; // fount_UUID
    minted_ip?: string | null;
    last_viewed_at?: string | null;
  };
  created_at?: string;
  claimed_at?: string | null;
  expires_at?: string | null;
}

export type ClaimStatus = "unclaimed" | "claimed";

export interface Receipt {
  id: string; // ctx_UUID
  kind: "receipt";
  owner_fount_id?: string | null;

  claim?: {
    short_code?: string;
    emoji_code?: string;
    status?: ClaimStatus;
  };

  data: {
    total_amount: number;
    currency: string;
    line_items: {
      description: string;
      quantity: number;
      unit_price: number;
      total: number;
    }[];
    location?: {
      store_id?: string;
      label?: string;
    };
  };

  metadata?: {
    source?: string;          // e.g. "pos_system_1"
    linked_invite_id?: string | null;
  };

  created_at?: string;
  updated_at?: string;
}
