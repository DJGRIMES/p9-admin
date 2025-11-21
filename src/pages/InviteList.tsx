import React from "react";
import { Link } from "react-router-dom";

const InviteList: React.FC = () => {
  // TODO: replace mock data with API
  const mockInvites = [
    { id: "inv_1", short_code: "AB7Q-FL9P", status: "unclaimed" },
    { id: "inv_2", short_code: "ZZ99-TEST", status: "claimed" }
  ];

  return (
    <div>
      <h2>Invite Tokens</h2>
      <p>Manage and inspect invite tokens.</p>
      <table>
        <thead>
          <tr>
            <th>Short Code</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {mockInvites.map((inv) => (
            <tr key={inv.id}>
              <td>
                <Link to={`/invites/${inv.id}`}>{inv.short_code}</Link>
              </td>
              <td>{inv.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        onClick={() => {
          // TODO: open Mint Invite dialog
          alert("Mint Invite dialog placeholder");
        }}
      >
        Mint New Invite
      </button>
    </div>
  );
};

export default InviteList;
// Invite list page placeholder.
