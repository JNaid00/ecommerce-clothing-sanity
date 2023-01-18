import React from "react";
import { useDispatch, useSelector } from "react-redux";
const Product = () => {
  const item = useSelector((state) => state.myCart.items);
  console.log("🚀 ~ file: [projectid].js:5 ~ Product ~ item", item);
  

  return <div>Product</div>;
};

export default Product;
