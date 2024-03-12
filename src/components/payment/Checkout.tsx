import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

export interface CheckoutProps {
  mode: string;
  amount: number;
  currency: string;
}

const StripePublishableKey = process.env.REACT_APP_STRIPE_TEST_KEY || "";

export function Checkout() {
  const stripePromise = loadStripe(StripePublishableKey);

  const options: StripeElementsOptions = {
    // passing the client secret obtained from the server
    //clientSecret: "sk_test_51On138FXmY0YOI9Eq1PRlQZcvSeITyjOFaPiGSnQiea8QMDHbaOTK6v1J3eScR2WBn4CDcBF79mD8xQcmFZ9NO2100YV3IaYBs",
    mode: "payment",
    amount: 1000,
    currency: "usd",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}
