import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_paymentGatewayPK);

const Payment = () => {
  return (
    <div>
      <SectionTitle subHeader="Pleae process" header="Payment"></SectionTitle>
      <h2 className="text-3xl">Give me money</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
