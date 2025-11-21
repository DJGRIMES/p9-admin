import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReceipt } from "../api/receipt";
import type { Receipt } from "../types/p9";
import { ApiError } from "../api/client";

const ReceiptDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetchReceipt(id)
      .then((resp) => setReceipt(resp.receipt))
      .catch((err) => setError((err as ApiError).message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div>
      <h2>Receipt Detail</h2>
      {loading ? <p>Resolving receipt spell...</p> : null}
      {error ? <p style={{ color: "#b00020" }}>Error: {error}</p> : null}

      {receipt ? (
        <div>
          <p><strong>Receipt ID:</strong> {receipt.id}</p>
          {receipt.owner_fount_id ? (
            <p>
              <strong>Owner fount:</strong> {receipt.owner_fount_id}
            </p>
          ) : null}

          <section>
            <h3>Claim</h3>
            {receipt.claim ? (
              <pre style={{ background: "#f9fafb", padding: "0.75rem" }}>
                {JSON.stringify(receipt.claim, null, 2)}
              </pre>
            ) : (
              <p>No claim data.</p>
            )}
          </section>

          <section>
            <h3>Data</h3>
            <pre style={{ background: "#f9fafb", padding: "0.75rem" }}>
              {JSON.stringify(receipt.data, null, 2)}
            </pre>
          </section>

          <section>
            <h3>Metadata</h3>
            <pre style={{ background: "#f9fafb", padding: "0.75rem" }}>
              {JSON.stringify(receipt.metadata ?? {}, null, 2)}
            </pre>
          </section>
        </div>
      ) : null}
    </div>
  );
};

export default ReceiptDetail;
