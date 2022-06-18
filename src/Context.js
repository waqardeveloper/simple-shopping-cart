import { createContext, useContext, useEffect, useState } from "react";
const Cart = createContext();
const Context = ({ children }) => {
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartProduct, setCartProduct] = useState([]);

  useEffect(() => {
    let totalCount = 0;
    let totalPrice = 0;
    cartProduct.forEach((item) => {
      totalCount += item.quantity;
      totalPrice += item.quantity * item.price;
    });
    setTotalCount(totalCount);
    setTotalPrice(totalPrice);
  }, [cartProduct]);

  return (
    <Cart.Provider
      value={{
        cartProduct,
        setCartProduct,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </Cart.Provider>
  );
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};
