import { ChakraProvider } from "@chakra-ui/react";

import type { AppProps } from "next/app";
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/inter/400.css";

const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
