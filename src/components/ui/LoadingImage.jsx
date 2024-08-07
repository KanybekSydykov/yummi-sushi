"use client";

import { Box, Skeleton, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const LoadingImage = ({ src ,alt,priority = false}) => {
  const [loading, setLoading] = useState(true);


  return (
    <Skeleton
      position={"absolute"}
      top={0}
      left={0}
      width={"100%"}
      height={"100%"}
      isLoaded={!loading}
    >
      <Image
        src={src}
        fill
        priority={priority}
        onLoad={() => setLoading(false)}
        alt={alt}
        sizes="100% 100%"
        style={{ objectFit: "cover" }}
      />
    </Skeleton>
  );
};

export default LoadingImage;
