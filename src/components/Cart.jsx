import React from "react";
import { CartState } from "../Context";

export default function Cart() {

  const { totalCount, totalPrice,cartProduct } = CartState();
  console.log("PRODUCTS");
  console.log(cartProduct);

  return (
    <>
      <h2>Total Items : {totalCount}</h2>
      <h2>Total Price : $ {totalPrice}</h2>
    </>
  );
}
