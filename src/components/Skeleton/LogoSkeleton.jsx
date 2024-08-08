import { AspectRatio, SkeletonCircle } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LogoSkeleton = () => {
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
        <Image src={"/logo.png"} onLoad={() => setLoading(false)} fill alt="logo" priority />
      </AspectRatio>
    </SkeletonCircle>
  );
};

export default LogoSkeleton;
