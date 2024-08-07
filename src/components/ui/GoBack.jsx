'use client';

import { useRouter } from "@/lib/navigation";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";

const GoBack = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push('/profile')}
      display={{ base: "flex", md: "none" }}
      width={"50px"}
      h={"50px"}
      borderRadius={"50%"}
      bg={"#fff"}
      _hover={{
        bg: "#fff",
      }}
      _focus={{
        bg: "#fff",
      }}
      boxShadow={"0px 0px 4px 0px rgba(151, 151, 151, 0.25)"}
    >
      <ChevronLeftIcon width={"32px"} h={"32px"} />
    </Button>
  );
};

export default GoBack;
