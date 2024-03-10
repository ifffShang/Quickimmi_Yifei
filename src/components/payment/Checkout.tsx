import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

export interface CheckoutProps {
  mode: string;
  amount: number;
  currency: string;
}

const StripePublishableKey = process.env.STRIPE_TEST_KEY || "";

export function Checkout() {
  const stripePromise = loadStripe(StripePublishableKey);

  const options = {
    // passing the client secret obtained from the server
    clientSecret: "{{CLIENT_SECRET}}",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}
