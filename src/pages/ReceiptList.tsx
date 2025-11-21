import React from "react";
import { Link } from "react-router-dom";

const ReceiptList: React.FC = () => {
  // TODO: replace mock data with API
  const mockReceipts = [
    { id: "rcpt_1", total_amount: 42.5, currency: "USD" },
    { id: "rcpt_2", total_amount: 19.99, currency: "USD" }
  ];

  return (
    <div>
      <h2>Receipts</h2>
      <p>Browse receipts and their claims/owners.</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {mockReceipts.map((r) => (
            <tr key={r.id}>
              <td>
                <Link to={`/receipts/${r.id}`}>{r.id}</Link>
              </td>
              <td>
                {r.total_amount.toFixed(2)} {r.currency}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReceiptList;
// Receipt list page placeholder.
