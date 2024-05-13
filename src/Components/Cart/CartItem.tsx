import React from "react";
import classes from "./CartItem.module.css";

interface CartItem {
  id: string;
  variant: string;
  price: string;
  name: string;
}

interface CartItemProps {
  key: string;
  name: string;
  amount: number;
  price: string;
  onRemove: () => void;
  onAdd: () => void;
  variant: string;
}

const CartItem: React.FC<CartItemProps> = (props) => {
  const price = `Rs : ${props.price}`;
  return (
    <li className={classes["cart-item"]}>
      <div>
        <div>
          {props.name},<span>{props.variant}</span>
        </div>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
