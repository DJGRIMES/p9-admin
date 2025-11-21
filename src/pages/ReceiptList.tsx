import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listReceipts } from "../api/receipt";
import type { Receipt } from "../types/p9";
import { ApiError } from "../api/client";

const ReceiptList: React.FC = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadReceipts() {
      try {
        const response = await listReceipts();
        setReceipts(response.receipts);
      } catch (err) {
        const apiErr = err as ApiError;
        setError(apiErr.message || "Unable to query receipt spellbook.");
      } finally {
        setLoading(false);
      }
    }

    void loadReceipts();
  }, []);

  return (
    <div>
      <h2>Receipts</h2>
      <p>Browse receipts and their claims/owners via spell calls.</p>

      {loading ? <p>Loading receipts...</p> : null}
      {error ? <p style={{ color: "#b00020" }}>Error: {error}</p> : null}

      {!loading && !error ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>
                ID
              </th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((receipt) => (
              <tr key={receipt.id}>
                <td style={{ padding: "0.5rem", borderBottom: "1px solid #f3f4f6" }}>
                  <Link to={`/receipts/${receipt.id}`}>{receipt.id}</Link>
                </td>
                <td style={{ padding: "0.5rem", borderBottom: "1px solid #f3f4f6" }}>
                  {receipt.data.total_amount.toFixed(2)} {receipt.data.currency}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default ReceiptList;
