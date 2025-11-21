import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchInvite } from "../api/invite";
import type { InviteToken } from "../types/p9";
import { ApiError } from "../api/client";

const InviteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [invite, setInvite] = useState<InviteToken | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetchInvite(id)
      .then((resp) => setInvite(resp.invite))
      .catch((err) => setError((err as ApiError).message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div>
      <h2>Invite Token Detail</h2>
      {loading ? <p>Resolving invite spell...</p> : null}
      {error ? <p style={{ color: "#b00020" }}>Error: {error}</p> : null}

      {invite ? (
        <div>
          <p><strong>Invite ID:</strong> {invite.id}</p>
          <p><strong>Short code:</strong> {invite.short_code}</p>
          <p><strong>Status:</strong> {invite.status}</p>
          <p><strong>Sponsor fount:</strong> {invite.sponsor_fount_id}</p>
          {invite.claimed_fount_id ? <p><strong>Claimed by:</strong> {invite.claimed_fount_id}</p> : null}

          <section>
            <h3>Context</h3>
            {invite.context ? (
              <pre style={{ background: "#f9fafb", padding: "0.75rem" }}>
                {JSON.stringify(invite.context, null, 2)}
              </pre>
            ) : (
              <p>No context provided.</p>
            )}
          </section>

          <section>
            <h3>Audit & Hints</h3>
            <pre style={{ background: "#f9fafb", padding: "0.75rem" }}>
              {JSON.stringify({ audit: invite.audit, hints: invite.hints }, null, 2)}
            </pre>
          </section>
        </div>
      ) : null}
    </div>
  );
};

export default InviteDetail;
