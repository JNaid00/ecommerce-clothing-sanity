import { IoMdRemove } from "react-icons/io";
import { HiPlus } from "react-icons/hi";
import { urlFor } from "@/lib/client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  IconButton,
  Box,
  Typography,
  useTheme,
  Button,
  Icon,
  Divider,
} from "@mui/material";
import { addToCart, setItems } from "@/store/cartSlice";
import { shades } from "@/styles/theme";
const ProductItem = ({ item, width }) => {
  const dispatch = useDispatch();
  const [count, setcount] = useState(1);
  const [isHovered, setisHovered] = useState(false);
  const { image, price, name, category, _id } = item;
  let SARand = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
  });
  const {
    palette: { neutral },
  } = useTheme();
  return (
    <Box width={width}>
      <div
        className="relative w-fit"
        onMouseOver={() => setisHovered(true)}
        onMouseOut={() => setisHovered(false)}
      >
        <Link href={`/product/${_id}`} onClick={() => dispatch(setItems(item))}>
          <img
            className="h-[400px] w-[300px] cursor-pointer"
            alt={name}
            src={isHovered ? urlFor(image[1]) : urlFor(image[0])}
          />
        </Link>

        <div
          className={`${
            isHovered ? "lg:blocked" : "lg:hidden"
          } absolute bottom-[10%] left-0 w-full px-[5%] blocked`}
        >
          <div className="flex justify-between">
            <div className="flex items-center bg-[#f5f5f5] rounded-sm space-x-1 ">
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
                        ...item,
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
        </div>
      </div>

      <div className="mt-1">
        <div className="flex space-x-3">
          {category.map((item, index) => (
            <div className="flex space-x-3" key={`${name}-${item}-${index}`}>
              <Typography variant="subtitle2">{item}</Typography>
              <Divider orientation="vertical" />
            </div>
          ))}
        </div>

        <Typography>{name}</Typography>
        <Typography fontWeight="bold">{SARand.format(price)}</Typography>
      </div>
    </Box>
  );
};

export default ProductItem;
