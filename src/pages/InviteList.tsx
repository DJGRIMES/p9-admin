import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listInvites } from "../api/invite";
import type { InviteToken } from "../types/p9";
import { ApiError } from "../api/client";

const InviteList: React.FC = () => {
  const [invites, setInvites] = useState<InviteToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadInvites() {
      try {
        const response = await listInvites();
        setInvites(response.invites);
      } catch (err) {
        const apiErr = err as ApiError;
        setError(apiErr.message || "Unable to pull invite spell list.");
      } finally {
        setLoading(false);
      }
    }

    void loadInvites();
  }, []);

  return (
    <div>
      <h2>Invite Tokens</h2>
      <p>Manage and inspect invite tokens resolved via MAGIC spells.</p>

      {loading ? <p>Loading invite spells...</p> : null}
      {error ? <p style={{ color: "#b00020" }}>Error: {error}</p> : null}

      {!loading && !error ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>
                Short Code
              </th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {invites.map((inv) => (
              <tr key={inv.id}>
                <td style={{ padding: "0.5rem", borderBottom: "1px solid #f3f4f6" }}>
                  <Link to={`/invites/${inv.id}`}>{inv.short_code}</Link>
                </td>
                <td style={{ padding: "0.5rem", borderBottom: "1px solid #f3f4f6" }}>{inv.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      <Link
        to="/invites/mint"
        style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "0.5rem 0.75rem",
          background: "#1f2937",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px"
        }}
      >
        Mint New Invite
      </Link>
    </div>
  );
};

export default InviteList;
