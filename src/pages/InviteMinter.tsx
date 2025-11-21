import React, { useState } from "react";
import MintInviteForm from "../components/invites/MintInviteForm";
import MintResultList from "../components/invites/MintResultList";
import type { InviteToken } from "../types/p9";

const InviteMinter: React.FC = () => {
  const [recentInvites, setRecentInvites] = useState<InviteToken[]>([]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
      <div>
        <h2 style={{ marginBottom: "0.25rem" }}>Mint Invite Tokens</h2>
        <p style={{ marginTop: 0, color: "#4b5563" }}>
          Create new invite tokens and optionally attach metadata before sharing.
        </p>
      </div>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(320px, 1fr) minmax(320px, 1fr)",
          gap: "1.5rem",
          alignItems: "start"
        }}
      >
        <div style={{ padding: "1rem", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
          <h3 style={{ marginTop: 0 }}>Mint New Tokens</h3>
          <MintInviteForm onMintSuccess={setRecentInvites} />
        </div>

        <div style={{ padding: "1rem", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
          <h3 style={{ marginTop: 0 }}>Recently Minted</h3>
          <MintResultList invites={recentInvites} />
        </div>
      </section>
    </div>
  );
};

export default InviteMinter;
