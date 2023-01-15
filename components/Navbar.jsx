import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "@/store/store";
import { setIsCartOpen } from "@/store/cartSlice";
import { Badge, Box, IconButton } from "@mui/material";
import { RxPerson } from "react-icons/rx";
import { BiShoppingBag, BiSearch } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
const Navbar = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.myCart.cart);
  
  return (
    <div className="flex items-center w-full  h-16 bg-[#FFFFFF]/90 text-black top-0 left-0 z-10">
      <div className="w-[80%] mx-auto flex items-center justify-between">
        <div className="cursor-pointer text-red-800 hover:bg-gray-200 p-2 rounded-lg">
          <h1 className="text-xl">Ecommerce</h1>
        </div>
        <div className="flex justify-between z-20">
          <IconButton sx={{ color: "black" }}>
            <BiSearch />
          </IconButton>
          <IconButton sx={{ color: "black" }}>
            <RxPerson />
          </IconButton>
          <Badge
            badgeContent={cart.length === 0 ? "0" : cart.length}
            color="secondary"
            sx={{
              "& .MuiBadge-badge": {
                right: 10,
                top: 10,
                height: "20px",
                width: "auto",
                fontSize: "15px",
                fontWeight: "bold",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black" }}
            >
              <BiShoppingBag />
            </IconButton>
          </Badge>
          <IconButton sx={{ color: "black" }}>
            <AiOutlineMenu />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(setIsCartOpen());
  }
);
export default Navbar;
