import { IoMdRemove } from "react-icons/io";
import { HiPlus } from "react-icons/hi";
import { BsSuitHeart } from "react-icons/bs";
import { addToCart } from "@/store/cartSlice";
import {
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { urlFor, client } from "@/lib/client";
import { useRouter } from "next/router";
import { fetchProduct } from "@/lib/fetchProduct";
import ProductItem from "@/components/ProductItem";
const Product = ({ product, allProducts }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const productId = router.query.projectid;

  const [item, setitem] = useState({});
  const [count, setcount] = useState(1);
  const [value, setValue] = useState("description");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let SARand = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
  });
  const { image, price, name, category, _id, details } = product;
  return (
    <div className="w-[80%] my-[80px] mx-auto  ">
      <div className="flex flex-wrap gap-x-[40px]">
        <div className="flex-40 mb-[40px]">
          <img
            className="w-full h-full object-contain"
            src={urlFor(image[0])}
          />
        </div>

        <div className="flex-50 mb-[40px] ">
          <div className="flex justify-between items-center">
            <div>HOME/ITEM</div>
            <div>PREV/NEXT</div>
          </div>

          <div className="mt-[65px] mb-[25px]">
            <Typography variant="h3">{name}</Typography>
            <Typography>{SARand.format(price)}</Typography>
            <Typography sx={{ mt: "20px" }}>{details}</Typography>
          </div>

          <div className="flex items-center min-h-[50px]">
            <div className="flex items-center bg-[#f5f5f5] rounded-sm space-x-1 mr-[20px]">
              <IconButton onClick={() => setcount(Math.max(count - 1, 1))}>
                <IoMdRemove />
              </IconButton>
              <Typography>{count}</Typography>
              <IconButton onClick={() => setcount(count + 1)}>
                <HiPlus />
              </IconButton>
            </div>

            <div className="bg-[#101010] hover:bg-[#101010]/80">
              <Button
                sx={{ color: "white" }}
                onClick={() => {
                  if (count === 0) {
                    toast.error("Please choose an amount");
                    return;
                  }
                  dispatch(
                    addToCart({
                      item: {
                        ...product,
                        count,
                      },
                    })
                  );
                }}
              >
                Add to Cart
              </Button>
            </div>
          </div>

          <div>
            <div className="mt-[20px] mb-[20px] flex items-center">
              <IconButton>
                <BsSuitHeart />
              </IconButton>
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </div>
            <div className="flex space-x-3">
              {category.map((item, index) => (
                <div
                  className="flex space-x-3"
                  key={`${name}-${item}-${index}`}
                >
                  <Typography variant="subtitle2">{item}</Typography>
                  <Divider orientation="vertical" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <Tabs
          textColor="primary"
          indicatorColor="primary"
          value={value}
          onChange={handleChange}
          sx={{
            "& .MuiTabs-flexContainer": {
              flexWrap: "wrap",
            },
          }}
        >
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="NEW ARRIVALS" value="newArrivals" />
        </Tabs>
      </div>

      <div className="flex flex-wrap gap-4">
        {value === "description" && ( <Typography>{details}</Typography>)}
      </div>


      <div className="mt-[50px] w-full">
        <Typography variant="h3" fontWeight="bold">Related Products</Typography>

        <div className="mt-[20px] flex flex-wrap gap-x-[1.33%] justify-between">
          {/* {allProducts.map((item, index) => (
            <ProductItem key={`${item._id}`} item={item} />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
    _id,
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      _id: product._id,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps = async ({ params: { _id } }) => {
  const query = `*[_type == "product" && _id == "${_id}"][0]`;
  const product = await client.fetch(query);

  return {
    props: { product},
  };
};

export default Product;
