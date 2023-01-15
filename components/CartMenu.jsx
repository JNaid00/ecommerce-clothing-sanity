import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { IoMdClose, IoMdRemove } from "react-icons/io";
import { HiPlus } from "react-icons/hi";
import { shades } from "@/pages/theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "@/store/cartSlice";
import { wrapper } from "@/store/store";
const CartMenu = () => {
  const flexBetween = "flex justify-between items-center";
  const isCartOpen = useSelector((state) => state.myCart.isCartOpen);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.myCart.cart);
  const totalPrice = 0;
  let SARand = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
  });

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
          <div className={`${flexBetween}`}>
            <Typography fontWeight="bold">SUBTOTAL</Typography>
            <Typography fontWeight="bold">
              {SARand.format(totalPrice)}
            </Typography>
          </div>
          <div className="mx-4">
            <Button
              variant="contained"
              sx={{
                color: "black",
                borderRadius: 0,
                minWidth: "100%",
                padding: "20px 40px",
                m: "20px 0",
                "&:hover": {
                  color: "white",
                },
              }}
              onClick={() => {
                dispatch(setIsCartOpen({}));
              }}
            >
              CHECKOUT
            </Button>
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
