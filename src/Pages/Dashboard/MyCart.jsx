import { Helmet } from "react-helmet-async";
import useCart from "../../hooks/useCart";

const MyCart = () => {
  const [cart] = useCart();
  console.log(cart);
  const total = cart.reduce((sum, item) => item.price + sum, 0);
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | My Cart</title>
      </Helmet>
      <div className="uppercase">
        <h3 className="text-3xl">Total Items: {cart.length}</h3>
        <h3 className="text-3xl">Total Cost: ${total}</h3>
        <button className="btn btn-sm btn-warning">Pay</button>
      </div>
    </div>
  );
};

export default MyCart;
