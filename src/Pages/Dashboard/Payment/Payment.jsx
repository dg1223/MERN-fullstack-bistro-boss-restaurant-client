import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../../../hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_paymentGatewayPK);

const Payment = () => {
  const [cart] = useCart();
  console.log(cart);
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const price = parseFloat(total.toFixed(2));

  return (
    <div>
      <SectionTitle subHeader="Pleae process" header="Payment"></SectionTitle>
      <h2 className="text-3xl">Give me money</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm price={price}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
