'use client';

import { Link } from "@/lib/navigation";
import { AspectRatio, Box, SkeletonCircle } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";

const Logo = () => {
  const [loading, setLoading] = useState(true);

  return (
    <SkeletonCircle
    isLoaded={!loading}
    w={{ base: "44px", md: "86px" }}
    h={{ base: "44px", md: "86px" }}
    position={"relative"}
  >
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
        <Image src={"/logo.png"} onLoad={() => setLoading(false)} fill alt="logo" priority sizes="100%" />
      </AspectRatio>
    </SkeletonCircle>
  );
};

export default Logo;
