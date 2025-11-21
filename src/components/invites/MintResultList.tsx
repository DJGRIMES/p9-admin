import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { InviteToken } from "../../types/p9";

interface MintResultListProps {
  invites: InviteToken[];
}

const MintResultList: React.FC<MintResultListProps> = ({ invites }) => {
  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  const copyToClipboard = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyMessage(`${label} copied to clipboard`);
      setTimeout(() => setCopyMessage(null), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
      setCopyMessage("Unable to copy to clipboard");
      setTimeout(() => setCopyMessage(null), 2000);
    }
  };

  if (!invites.length) {
    return <p>No recently minted invites yet.</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {copyMessage ? (
        <div style={{ color: "#065f46", background: "#ecfdf3", padding: "0.5rem", borderRadius: "4px" }}>
          {copyMessage}
        </div>
      ) : null}

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Short code</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Emoji code</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Status</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Sponsor</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Created</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invites.map((invite) => (
              <tr key={invite.id}>
                <td style={{ padding: "0.5rem", borderBottom: "1px solid #f3f4f6" }}>
                  <Link to={`/invites/${invite.id}`} style={{ color: "#1f2937", fontWeight: 600 }}>
                    {invite.short_code}
                  </Link>
                </td>
                <td style={{ padding: "0.5rem", borderBottom: "1px solid #f3f4f6" }}>
                  {invite.emoji_code || "—"}
                </td>
                <td style={{ padding: "0.5rem", borderBottom: "1px solid #f3f4f6" }}>
                  {invite.status}
                </td>
                <td style={{ padding: "0.5rem", borderBottom: "1px solid #f3f4f6" }}>
                  {invite.sponsor_fount_id}
                </td>
                <td style={{ padding: "0.5rem", borderBottom: "1px solid #f3f4f6" }}>
                  {invite.created_at ? new Date(invite.created_at).toLocaleString() : ""}
                </td>
                <td style={{ padding: "0.5rem", borderBottom: "1px solid #f3f4f6", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(invite.short_code, "Short code")}
                    style={{ padding: "0.35rem 0.6rem", border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", borderRadius: "4px" }}
                  >
                    Copy code
                  </button>
                  {invite.qr_payload ? (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(invite.qr_payload as string, "QR payload")}
                      style={{ padding: "0.35rem 0.6rem", border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", borderRadius: "4px" }}
                    >
                      Copy link
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MintResultList;
