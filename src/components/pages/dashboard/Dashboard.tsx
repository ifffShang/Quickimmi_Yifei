import React from "react";
import { Link } from "react-router-dom";
import { BillingSummary } from "../../payment/BillingSummary";

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/newCase">Apply</Link>
      <BillingSummary />
    </div>
  );
}
