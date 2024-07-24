"use client";

import { Roboto } from "next/font/google";
import { background, ChakraProvider, extendTheme } from "@chakra-ui/react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

const theme = extendTheme({
  fonts: {
    roboto: roboto.style.fontFamily,
  },
  colors: {
    main: "#FF8341",
    fontgray: "#363636",
    lightgray: "#A0A0A0",
    darkGray: "#555555",
  },
});

export function Providers({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
