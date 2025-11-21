import React from "react";
import { useParams } from "react-router-dom";

const InviteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // TODO: fetch real InviteToken by id
  return (
    <div>
      <h2>Invite Token Detail</h2>
      <p>Invite ID: {id}</p>
      <p>QR code, emoji code, sponsor/claimed Fount links, status timeline, etc. go here.</p>
    </div>
  );
};

export default InviteDetail;
// Invite detail page placeholder.
