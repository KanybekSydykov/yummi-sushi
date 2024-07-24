import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

const SpinnerBox = ({size='xl'}) => {
  return (
    <Box
      zIndex={999}
      position={"absolute"}
      bg={"rgba(0,0,0,0.5)"}
      w={"100%"}
      h={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Spinner color={"orange.500"} size={size} />
    </Box>
  );
};

export default SpinnerBox;
