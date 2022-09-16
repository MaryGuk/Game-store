import "./cart-block.css";
import { BiCartAlt } from "react-icons/bi";
import { useSelector } from "react-redux/es/exports";
import { calcTotalPrice } from "../utils";
import { CartMenu } from "../cart-menu/cart-menu";
import { useCallback, useState } from "react";
import { ItemsInCart } from "../items-in-cart/items-in-cart";
import { useNavigate } from "react-router-dom";

export const CartBlock = () => {
  const [isCartMenuVisible, setIsCartMenuVisible] = useState(false);
  const items = useSelector((state) => state.cart.itemsInCart);
  const totalPrice = calcTotalPrice(items);
  const navigate = useNavigate();

  const handleclick = useCallback(() => {
    setIsCartMenuVisible(false);
    navigate("/order");
  }, [navigate]);

  return (
    <div className="cart-block">
      <ItemsInCart quantity={items.length} />
      <BiCartAlt
        color="white"
        size={25}
        className="cart-block__icon"
        onClick={() => setIsCartMenuVisible(!isCartMenuVisible)}
      />
      {totalPrice > 0 ? (
        <span className="cart-block__total-price"> {totalPrice} руб. </span>
      ) : null}
      {isCartMenuVisible && <CartMenu items={items} onClick={handleclick} />}
    </div>
  );
};
