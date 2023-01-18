import React, { useState } from "react";
import { Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
import ProductItem from "./ProductItem";
import { useDispatch, useSelector } from "react-redux";

export default function ShoppingList({
  newArrivals,
  popular,
  topRated,
  allProducts,
}) {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const breakPoint = useMediaQuery("(min-width:600px)");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="w-[80%] mx-auto my-7">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL PRODUCTS" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="POPULAR" value="popular" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>
      <div className="mx-auto grid grid-cols-shoping-list justify-around gap-y-[20px] gap-x-[1.33%]">
      {value === "all" &&
          allProducts.map((item, index) => (
            <ProductItem key={`${item._id}`} item={item} />
          ))}
        {value === "newArrivals" &&
          newArrivals.map((item, index) => (
            <ProductItem key={`${item._id}`} item={item} />
          ))}
        {value === "popular" &&
          popular.map((item, index) => (
            <ProductItem key={`${item._id}`} item={item} />
          ))}
        {value === "topRated" &&
          topRated.map((item, index) => (
            <ProductItem key={`${item._id}`} item={item} />
          ))}
      </div>
    </div>
  );
}
