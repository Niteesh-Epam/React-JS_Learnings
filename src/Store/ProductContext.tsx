import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  FC,
  ReactNode,
} from "react";

interface ProductVariant {
  size: string;
  price: string;
}

interface CartItem {
  id: string;
  variant: string;
  price: string;
  name: string;
  qty: number;
}

interface CartState {
  cartitems: CartItem[];
  TotalAmount: number;
}

interface ProductContextType {
  cartitems: CartItem[];
  TotalAmount: number;
  handleAddItem: (item: CartItem) => void;
  variant: { [key: string]: ProductVariant };
  handleRemoveItem: (id: string, variant: string) => void;
  handleVariantChange: (id: string, variant: ProductVariant) => void;
}

const defaultCartState: CartState = {
  cartitems: [],
  TotalAmount: 0,
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface AddAction {
  type: "ADD";
  item: CartItem;
}

interface RemoveAction {
  type: "REMOVE";
  id: string;
  variant: string;
}

type CartAction = AddAction | RemoveAction;

const isAddAction = (action: CartAction): action is AddAction => {
  return action.type === "ADD";
};

const isRemoveAction = (action: CartAction): action is RemoveAction => {
  return action.type === "REMOVE";
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD":
      const updatedTotalAmount =
        state.TotalAmount + Number(action.item.price) * action.item.qty;

      if (isAddAction(action)) {
        const existingIndex = state.cartitems.findIndex(
          (item) =>
            item.id === action.item.id && item.variant === action.item.variant
        );

        let updatedItems;

        if (existingIndex !== -1) {
          const existingItem = state.cartitems[existingIndex];
          const updatedItem = {
            ...existingItem,
            qty: existingItem.qty + action.item.qty,
          };

          updatedItems = [...state.cartitems];
          updatedItems[existingIndex] = updatedItem;
        } else {
          updatedItems = [...state.cartitems, action.item];
        }

        return {
          ...state,
          cartitems: updatedItems,
          TotalAmount: Number(updatedTotalAmount.toFixed(2)),
        };
      }
      break;
    case "REMOVE":
      if (isRemoveAction(action)) {
        const existingIndex = state.cartitems.findIndex(
          (item) => item.id === action.id && item.variant === action.variant
        );
        const existingItem = state.cartitems[existingIndex];

        console.log(existingItem);
        let updateItems;
        let updateitemPrice = Number(
          (state.TotalAmount - Number(existingItem.price)).toFixed(2)
        );
        if (existingItem.qty === 1) {
          updateItems = state.cartitems.filter(
            (item) =>
              !(item.id === action.id && item.variant === action.variant)
          );
        } else {
          const updatedItem = {
            ...existingItem,
            qty: existingItem.qty - 1,
          };
          updateItems = [...state.cartitems];
          updateItems[existingIndex] = updatedItem;
        }
        return {
          ...state,
          cartitems: updateItems,
          TotalAmount: updateitemPrice,
        };
      }
      break;
    default:
      return state;
  }

  return state;
};

const ProductsData: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const [variant, setVariant] = useState<{ [key: string]: ProductVariant }>({});

  const handleVariantChange = (id: string, variant: ProductVariant) => {
    setVariant((prev) => {
      return { ...prev, [id]: variant };
    });
  };

  const handleAddItem = (item: CartItem) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const handleRemoveItem = (id: string, variant: string) => {
    dispatchCartAction({ type: "REMOVE", id: id, variant: variant });
  };
  return (
    <ProductContext.Provider
      value={{
        cartitems: cartState.cartitems,
        TotalAmount: cartState.TotalAmount,
        handleAddItem,
        handleRemoveItem,
        variant,
        handleVariantChange,
      }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductState = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "useProductState must be used within a ProductContextProvider"
    );
  }
  return context;
};

export default ProductsData;
