import React from "react";
import { useParams, Link } from "react-router-dom";

const FountDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // TODO: fetch real Fount + Pref + Prof + related Invites/Receipts
  return (
    <div>
      <h2>Fount Detail</h2>
      <p>Fount ID: {id}</p>

      <section>
        <h3>Profile (Prof)</h3>
        <p>Profile details will be shown here.</p>
      </section>

      <section>
        <h3>Settings (Pref)</h3>
        <p>Preferences editor will go here.</p>
      </section>

      <section>
        <h3>Invites</h3>
        <p>
          Show invite tokens sponsored or claimed by this Fount.{" "}
          <Link to="/invites">Go to Invites list</Link>
        </p>
      </section>

      <section>
        <h3>Receipts</h3>
        <p>
          Show receipts owned by this Fount.{" "}
          <Link to="/receipts">Go to Receipts list</Link>
        </p>
      </section>
    </div>
  );
};

export default FountDetail;
// Fount detail page placeholder.
