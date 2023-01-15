import "@/styles/globals.css";
import { wrapper } from "@/store/store";
import { theme } from "../styles/theme";
import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { Toaster } from 'react-hot-toast';
const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
        <Toaster />
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default wrapper.withRedux(App);
