import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "@/store/store";
import { setIsCartOpen } from "@/store/cartSlice";
import { Badge, Box, IconButton } from "@mui/material";
import { RxPerson } from "react-icons/rx";
import { BiShoppingBag, BiSearch } from "react-icons/bi";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { motion } from "framer-motion";
const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Navbar = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.myCart.cart);
  const isCartOpen = useSelector((state) => state.myCart.isCartOpen);
  return (
    <motion.nav initial={false} animate={isCartOpen ? "open" : "closed"}>
      <motion.div variants={sidebar} />
      <div className="flex items-center w-full  h-16 bg-[#FFFFFF] text-black top-0 left-0 z-10 md:fixed shadow-lg">
        <div className="w-[80%] mx-auto flex items-center justify-between">
          <div className="cursor-pointer text-red-800 hover:bg-gray-200 p-2 rounded-lg">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <img className="h-9 w-9" src="logo.png" alt="" />
                <h1 className="text-xl">Ecommerce</h1>
              </div>
            </Link>
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
                  right: 5,
                  top: 5,
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
    </motion.nav>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(setIsCartOpen());
  }
);
export default Navbar;
