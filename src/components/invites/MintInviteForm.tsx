import React, { useState } from "react";
import { mintInvites } from "../../api/invite";
import type { MintInviteRequest } from "../../api/invite";
import type { InviteToken } from "../../types/p9";
import { ApiError } from "../../api/client";

export const INVITE_CONTEXT_TYPES = [
  "admin_invite",
  "kiosk_invite",
  "pos_receipt_claim",
  "test"
] as const;

interface MintInviteFormProps {
  onMintSuccess: (invites: InviteToken[]) => void;
}

interface FormState {
  count: number;
  contextType: string;
  contextLabel: string;
  contextNote: string;
  sponsorFountId: string;
  emailSuggestion: string;
  source: string;
  expiresAt: string;
}

const initialState: FormState = {
  count: 1,
  contextType: INVITE_CONTEXT_TYPES[0],
  contextLabel: "",
  contextNote: "",
  sponsorFountId: "",
  emailSuggestion: "",
  source: "",
  expiresAt: ""
};

const MAX_LABEL_LENGTH = 120;
const MAX_NOTE_LENGTH = 500;
const MAX_COUNT = 50;

const MintInviteForm: React.FC<MintInviteFormProps> = ({ onMintSuccess }) => {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (key: keyof FormState, value: string | number) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const validate = (): string | null => {
    if (!formState.sponsorFountId.trim()) {
      return "Sponsor fount ID is required.";
    }
    if (!formState.contextType) {
      return "Context type is required.";
    }
    if (formState.count < 1) {
      return "You must mint at least one token.";
    }
    if (formState.count > MAX_COUNT) {
      return `You can mint up to ${MAX_COUNT} tokens at once.`;
    }
    if (formState.contextLabel.length > MAX_LABEL_LENGTH) {
      return `Context label must be under ${MAX_LABEL_LENGTH} characters.`;
    }
    if (formState.contextNote.length > MAX_NOTE_LENGTH) {
      return `Context note must be under ${MAX_NOTE_LENGTH} characters.`;
    }
    return null;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    const payload: MintInviteRequest = {
      count: formState.count,
      sponsor_fount_id: formState.sponsorFountId.trim(),
      context: {
        type: formState.contextType,
        label: formState.contextLabel.trim() || undefined,
        note: formState.contextNote.trim() || undefined
      },
      hints: {
        email_suggestion: formState.emailSuggestion.trim() || undefined,
        source: formState.source.trim() || undefined
      },
      expires_at: formState.expiresAt.trim() || undefined
    };

    if (payload.context && !payload.context.label && !payload.context.note && !payload.context.type) {
      delete payload.context;
    }

    if (payload.hints && !payload.hints.email_suggestion && !payload.hints.source) {
      delete payload.hints;
    }

    try {
      const response = await mintInvites(payload);
      onMintSuccess(response.invites);
    } catch (err) {
      const apiErr = err as ApiError;
      setError(apiErr.message || "Failed to mint invites.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div>
        <label style={{ display: "block", fontWeight: 600 }}>
          Number of tokens
          <input
            type="number"
            min={1}
            max={MAX_COUNT}
            value={formState.count}
            onChange={(e) => updateField("count", Number(e.target.value))}
            style={{ display: "block", marginTop: "0.25rem", padding: "0.35rem", width: "100%" }}
            required
          />
        </label>
        <small>Min 1, max {MAX_COUNT} tokens per request.</small>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        <label style={{ display: "block" }}>
          Context type
          <select
            value={formState.contextType}
            onChange={(e) => updateField("contextType", e.target.value)}
            required
            style={{ display: "block", marginTop: "0.25rem", padding: "0.35rem", width: "100%" }}
          >
            {INVITE_CONTEXT_TYPES.map((context) => (
              <option key={context} value={context}>
                {context}
              </option>
            ))}
          </select>
        </label>

        <label style={{ display: "block" }}>
          Sponsor Fount ID
          <input
            type="text"
            value={formState.sponsorFountId}
            onChange={(e) => updateField("sponsorFountId", e.target.value)}
            required
            style={{ display: "block", marginTop: "0.25rem", padding: "0.35rem", width: "100%" }}
          />
        </label>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        <label style={{ display: "block" }}>
          Context label (optional)
          <input
            type="text"
            value={formState.contextLabel}
            onChange={(e) => updateField("contextLabel", e.target.value)}
            maxLength={MAX_LABEL_LENGTH}
            style={{ display: "block", marginTop: "0.25rem", padding: "0.35rem", width: "100%" }}
          />
        </label>

        <label style={{ display: "block" }}>
          Hints source (optional)
          <input
            type="text"
            value={formState.source}
            onChange={(e) => updateField("source", e.target.value)}
            style={{ display: "block", marginTop: "0.25rem", padding: "0.35rem", width: "100%" }}
          />
        </label>
      </div>

      <label style={{ display: "block" }}>
        Context note (optional)
        <textarea
          value={formState.contextNote}
          onChange={(e) => updateField("contextNote", e.target.value)}
          maxLength={MAX_NOTE_LENGTH}
          rows={3}
          style={{ display: "block", marginTop: "0.25rem", padding: "0.35rem", width: "100%" }}
        />
      </label>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        <label style={{ display: "block" }}>
          Hint: Email suggestion (optional)
          <input
            type="email"
            value={formState.emailSuggestion}
            onChange={(e) => updateField("emailSuggestion", e.target.value)}
            style={{ display: "block", marginTop: "0.25rem", padding: "0.35rem", width: "100%" }}
          />
        </label>

        <label style={{ display: "block" }}>
          Expires at (ISO timestamp or duration)
          <input
            type="text"
            value={formState.expiresAt}
            onChange={(e) => updateField("expiresAt", e.target.value)}
            placeholder="2024-12-31T23:59:59Z"
            style={{ display: "block", marginTop: "0.25rem", padding: "0.35rem", width: "100%" }}
          />
        </label>
      </div>

      {error ? (
        <div style={{ color: "#b00020" }}>
          <strong>Error:</strong> {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        style={{
          background: "#111827",
          color: "#fff",
          border: "none",
          padding: "0.65rem 1rem",
          cursor: loading ? "not-allowed" : "pointer",
          borderRadius: "4px",
          width: "fit-content"
        }}
      >
        {loading ? "Minting..." : "Mint Tokens"}
      </button>
    </form>
  );
};

export default MintInviteForm;
