import "@/styles/globals.css";
import { wrapper } from "@/store/store";
import { theme } from "../styles/theme";
import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { useSelector } from "react-redux";
import CartMenu from "@/components/CartMenu";
const App = ({ Component, pageProps }) => {
  const isCartOpen = useSelector((state) => state.myCart.isCartOpen);
  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <CssBaseline />
      <Navbar/>
      <div className="md:mt-16">
      <Component {...pageProps} />
      </div>
      
      {isCartOpen && <CartMenu />}
    </ThemeProvider>
  );
};

export default wrapper.withRedux(App);
