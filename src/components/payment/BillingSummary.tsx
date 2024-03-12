import React from "react";
import { Link } from "react-router-dom";

export function BillingSummary() {
  const amount = 10;

  return (
    <div>
      <h1>Billing Summary</h1>
      <p>Amount: ${amount}</p>
      <p>Mode: Payment</p>
      <p>Currency: USD</p>
      <Link to="/checkout">Checkout</Link>
    </div>
  );
}
