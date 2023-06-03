import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = ({ price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  // manage Pay button state: Keep button disabled while transaction
  // is in progress
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(
    () => {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        // coming from backend
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
      // if you don't keep the dependency array empty, useEffect will
      // get called repeatedly because of some [unknown] changes in
      // price and/or axiosSecure
    },
    [
      /* price, axiosSecure */
    ]
  );

  const handleSubmit = async (event) => {
    // prevents browser from reloading page on event trigger
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("payment method: ", paymentMethod);
    }

    // when every payment component is found,
    // set transaction to be in progress
    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "unknown",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }
    console.log("payment intent", paymentIntent);
    setProcessing(false);

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      // TODO next steps
    }
  };

  return (
    <>
      <form className="w-2/3 m-8" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#000000",
                "::placeholder": {
                  color: "#000000",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary btn-sm mt-4"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-black ml-8">{cardError}</p>}
      {transactionId && (
        <p className="text-black ml-8">
          Transaction complete with transaction ID: {transactionId}
        </p>
      )}
    </>
  );
};

export default CheckoutForm;
