import { AspectRatio, Box } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Box position={"relative"}>
      <Link
        href={"/"}
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
          zIndex: "1",
        }}
      />

      <AspectRatio
        ratio={1}
        position={"relative"}
        w={{ base: "44px", md: "86px" }}
        h={{ base: "44px", md: "86px" }}
      >
        <Image src={"/logo.png"} fill alt="logo" priority />
      </AspectRatio>
    </Box>
  );
};

export default Logo;
