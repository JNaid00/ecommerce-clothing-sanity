import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { IoMdClose, IoMdRemove } from "react-icons/io";
import {BiRightArrowAlt} from "react-icons/bi"
import { HiPlus } from "react-icons/hi";
import { shades } from "@/styles/theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "@/store/cartSlice";
import { wrapper } from "@/store/store";
import { urlFor } from "@/lib/client";
import Link from "next/link";
const CartMenu = () => {
  const flexBetween = "flex justify-between items-center";
  const isCartOpen = useSelector((state) => state.myCart.isCartOpen);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.myCart.cart);
  let SARand = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
  });
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);
  console.log(cart);
  return (
    <div
      className={`${
        isCartOpen ? "block" : "none"
      } bg-black/40 fixed z-20 w-full h-full left-0 top-0 overflow-auto`}
    >
      <div className="fixed right-0 bottom-0 w-[80%] max-w-[400px] h-full bg-white">
        <div className="p-8 overflow-auto h-full">
          <div className={`${flexBetween} mb-4`}>
            <Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <IoMdClose />
            </IconButton>
          </div>
          {/* Cart List */}
          <div>
            {cart.map((item, index) => (
              <div key={`${item._id}-${item.name}-${index}`}>
                <div className="py-4 flex justify-between items-center">
                  <Box flex="1 1 60%">
                    <img
                      src={urlFor(item.image[0])}
                      alt={item.name}
                      className="w-[123px] h-[164px]"
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    <div className="flex justify-between items-center mb-1">
                      <Typography fontWeight="bold">{item.name}</Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ _id: item._id }))
                        }
                      >
                        <IoMdClose />
                      </IconButton>
                    </div>
                    <p className="max-w-[190px] overflow-y-auto max-h-16">
                      {item.details.substring(
                        0,
                        Math.min(70, item.details.length)
                      )}
                      ...
                    </p>
                    <div className="flex justify-between items-center my-4">
                      <div className="flex items-center border-[1.5px] border-gray-400">
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ _id: item._id }))
                          }
                        >
                          <IoMdRemove />
                        </IconButton>
                        <Typography>{item.count}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ _id: item._id }))
                          }
                        >
                          <HiPlus />
                        </IconButton>
                      </div>

                      <Typography fontWeight="bold">
                        {SARand.format(item.price)}
                      </Typography>
                    </div>
                  </Box>
                </div>
                <Divider />
              </div>
            ))}
          </div>

          <div className={`${flexBetween}`}>
            <Typography fontWeight="bold">SUBTOTAL</Typography>
            <Typography fontWeight="bold">
              {SARand.format(totalPrice)}
            </Typography>
           
          </div>
          <div className="mt-5">
            <Link
              href="/checkout/Index"
              //className="bg-slate-900 text-white border-2 border-slate-900 hover:bg-transparent hover:text-black ease-in-out transition-transform min-w-full rounded-md py-5 px-10 my-5"
              onClick={() => {
                dispatch(setIsCartOpen({}));
              }}
            >
              <div className="cta w-fit">
                <span className="textspan">CHECKOUT</span>
              </div>
            
            </Link>
          </div>
         
        </div>
      </div>
     
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(setIsCartOpen());
    store.dispatch(decreaseCount());
    store.dispatch(increaseCount());
    store.dispatch(removeFromCart());
  }
);
export default CartMenu;
