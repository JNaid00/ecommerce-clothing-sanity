import "@/styles/globals.css";
import { wrapper } from "@/store/store";
import { theme } from "../styles/theme";
import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { useSelector } from "react-redux";
import CartMenu from "@/components/CartMenu";
import Footer from "@/components/Footer";
import Head from "next/head";
const App = ({ Component, pageProps }) => {
  const isCartOpen = useSelector((state) => state.myCart.isCartOpen);
  return (
    <ThemeProvider theme={theme}>
       <Head>
          <title>Ecommerce</title>
          <link rel="icon" href="/logo.png" />
        </Head>
      <Toaster />
      <CssBaseline />
      <Navbar />
      <div className="md:mt-16">
        <Component {...pageProps} />
      </div>
      <Footer />
      {isCartOpen && <CartMenu />}
    </ThemeProvider>
  );
};

export default wrapper.withRedux(App);
