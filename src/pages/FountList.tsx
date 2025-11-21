import React from "react";
import { Link } from "react-router-dom";
// import { Fount } from "../types/p9";

const FountList: React.FC = () => {
  // TODO: replace mock data with API call
  const mockFounts = [
    { id: "fount_1", public_key: "sess_pub_abc", state: "active" },
    { id: "fount_2", public_key: "sess_pub_xyz", state: "disabled" }
  ];

  return (
    <div>
      <h2>Founts</h2>
      <p>List of Fount identities in the system.</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Public Key</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {mockFounts.map((f) => (
            <tr key={f.id}>
              <td>
                <Link to={`/founts/${f.id}`}>{f.id}</Link>
              </td>
              <td>{f.public_key}</td>
              <td>{f.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FountList;
// Fount list page placeholder.
