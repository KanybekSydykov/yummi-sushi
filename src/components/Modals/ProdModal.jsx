'use client'
import React from 'react'
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
  } from "@chakra-ui/react";
import ProdInfo from './ProdInfo';

const ProdModal = ({isOpen,onOpen,onClose,product}) => {

  return (
    <Modal
    isCentered
    isOpen={isOpen}
    onClose={onClose}
    size={"xl"}
    scrollBehavior="inside"
    onOverlayClick={onClose}
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
        onClick={onClose}
      />
      <ModalBody
        p={{ base: "16px", lg: "30px" }}
        position={"relative"}
        userSelect={"none"}
        maxW={{ base: "95vw", lg: "90vw" }}
      >
        <ProdInfo productInfo={product} onClose={onClose} />
      </ModalBody>
    </ModalContent>
  </Modal>
  )
}

export default ProdModal