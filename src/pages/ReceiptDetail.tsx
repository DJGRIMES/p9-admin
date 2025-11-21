import React from "react";
import { useParams } from "react-router-dom";

const ReceiptDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // TODO: fetch real Receipt by id
  return (
    <div>
      <h2>Receipt Detail</h2>
      <p>Receipt ID: {id}</p>
      <p>Line items, total, owner Fount, claim info, and linked invite will appear here.</p>
    </div>
  );
};

export default ReceiptDetail;
// Receipt detail page placeholder.
