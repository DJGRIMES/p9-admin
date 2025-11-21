import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listFounts } from "../api/fount";
import type { Fount } from "../types/p9";
import { ApiError } from "../api/client";

const FountList: React.FC = () => {
  const [founts, setFounts] = useState<Fount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFounts() {
      try {
        const response = await listFounts();
        setFounts(response.founts);
      } catch (err) {
        const apiErr = err as ApiError;
        setError(apiErr.message || "Unable to load founts spell.");
      } finally {
        setLoading(false);
      }
    }

    void loadFounts();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2>Founts</h2>
          <p style={{ color: "#4b5563" }}>
            Listing fount identities directly from the spell-based backend.
          </p>
        </div>
      </div>

      {loading ? <p>Loading founts...</p> : null}
      {error ? <p style={{ color: "#b00020" }}>Error: {error}</p> : null}

      {!loading && !error ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>
                ID
              </th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>
                Public Key
              </th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>
                State
              </th>
            </tr>
          </thead>
          <tbody>
            {founts.map((fount) => (
              <tr key={fount.id}>
                <td style={{ padding: "0.5rem", borderBottom: "1px solid #f3f4f6" }}>
                  <Link to={`/founts/${fount.id}`}>{fount.id}</Link>
                </td>
                <td style={{ padding: "0.5rem", borderBottom: "1px solid #f3f4f6" }}>{
                  fount.public_key
                }</td>
                <td style={{ padding: "0.5rem", borderBottom: "1px solid #f3f4f6" }}>{fount.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default FountList;
