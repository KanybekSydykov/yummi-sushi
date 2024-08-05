"use client";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {createPortal} from "react-dom";

const productNameStyles = {
  fontFamily: "roboto",
  fontWeight: "700",
  fontSize: { base: "18px", lg: "20px" },
  color: "#0a0a0a",
};

const priceStyles = {
  fontFamily: "roboto",
  fontWeight: "700",
  fontSize: { base: "20px", lg: "22px" },
  color: "main",
};

const discountStyles = {
  fontFamily: "roboto",
  fontWeight: "400",
  fontSize: { base: "18px", lg: "20px" },
  color: "lightgray",
  textDecoration: "line-through",
};

const descriptionStyles = {
  fontFamily: "roboto",
  fontWeight: "400",
  fontSize: { base: "14px", lg: "16px" },
  color: "fontgray",
  whiteSpace: "pre-wrap",
};

const imageStyles = {
  ratio: 1,
  width: { base: "100%", lg: "450px" },
  height: { base: "100%", lg: "450px" },
  flexShrink: 0,
  borderRadius: "25px",
  overflow: "hidden",
};

function ProductModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, []);

function onDismiss(){
    onClose();
    setTimeout(() => {
      router.back({scroll: false});
    },400)
  }

  return createPortal(

      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}
        scrollBehavior="inside"
        onOverlayClick={onDismiss}
      >
        <ModalOverlay
          bg="rgba(0,0,0,0.2)"
          backdropFilter="auto"
          backdropInvert="1%"
          backdropBlur="10px"
        />
        <ModalContent
          minW={{ base: "auto", lg: "fit-content" }}
          minH={{ base: "auto", lg: "fit-content" }}
          borderRadius={"25px"}
          width={{ base: "calc(100% - 32px)", lg: "fit-content" }}
          height={{ base: "80dvh", lg: "fit-content" }}
        >
          <ModalCloseButton
            top={{ base: "-36px", lg: "0.5rem" }}
            left={{ base: "calc(50% - 16px)", lg: "calc(100% - 40px)" }}
            bg={{ base: "white", lg: "none" }}
            borderRadius={"50%"}
            _focusVisible={{ boxShadow: "none" }}
            zIndex={10}
            onClick={onDismiss}
          />
          <ModalBody
            p={{ base: "16px", lg: "30px" }}
            position={"relative"}
            userSelect={"none"}
            maxW={{ base: "95vw", lg: "90vw" }}
          >
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>,
   document.getElementById("modal-root")
  );
}

export default ProductModal;
