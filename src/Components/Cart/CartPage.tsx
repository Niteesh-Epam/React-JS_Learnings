import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import { useProductState } from "../../Store/ProductContext";

interface CartItemProp {
  id: string;
  variant: string;
  price: string;
  name: string;
  qty: number;
}

const CartPage: React.FC<{}> = () => {
  const context = useProductState();
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',context);
  const { handleAddItem, TotalAmount, handleRemoveItem, cartitems } = context;

  const cartItemAddHandler = (item: CartItemProp) => {
    handleAddItem({ ...item, qty: 1 });
  };

  const cartItemRemoveHandler = (id: string, variant: string) => {
    handleRemoveItem(id, variant);
    console.log(id);
  };

  console.log(cartitems, "cart-items");
  return (
    <div>
      <ul className={classes["cart-items"]}>
        {cartitems.map((item) => (
          <CartItem
            key={`${item.id}-${item.variant}`}
            name={item.name}
            amount={item.qty}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id, item.variant)}
            onAdd={cartItemAddHandler.bind(null, item)}
            variant={item.variant}
          />
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>Rs : {TotalAmount}</span>
      </div>
    </div>
  );
};

export default CartPage;
