"use client";

import { Skeleton } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";

const LoadingImage = ({ src ,alt,priority,size,load}) => {
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
        src={src ? src : "/banner-1.svg"}
        fill
        priority={priority}
        onLoad={() => setLoading(false)}
        alt={alt}
        sizes={size ? size : "100vw"}
        loading={!priority ? load : undefined} // Avoid conflict by conditionally using 'loading'
        style={{
          objectFit: "cover",
        }}
      />
    </Skeleton>
  );
};

export default LoadingImage;
