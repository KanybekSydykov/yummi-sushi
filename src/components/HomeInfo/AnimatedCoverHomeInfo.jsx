"use client";
import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

const AnimatedCoverHomeInfo = ({ children }) => {
  return (
    <Flex
      as={motion.div}
      flexDir={"column"}
      mt={{ base: "100px", lg: "120px" }}
      mb={{ base: "158px", lg: "143px" }}
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 1.8, ease: "linear" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: { base: 0.7, lg: 0.3 } }}
    >
      {children}
    </Flex>
  );
};

export default AnimatedCoverHomeInfo;
