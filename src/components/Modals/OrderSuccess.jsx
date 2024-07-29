"use client";
import { CheckIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderSuccess({ showModal = false, setShowModal }) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [delay, setDelay] = useState(5);

  useEffect(() => {
    if (showModal) {
      if (delay > 0) {
        setTimeout(() => setDelay(delay - 1), 1000);
      } else {
        router.push("/");
        setShowModal(false);
      }
    }
  }, [delay, showModal]);

  return (
    <>
      <Modal isOpen={showModal} onClose={onClose} size={"md"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton onClick={() => setShowModal(false)} />
          <ModalBody
            flexDir={"column"}
            gap={"16px"}
            alignItems={"center"}
            justifyContent={"center"}
            display={"flex"}
          >
            <CheckIcon boxSize={50} color="green.500" />
            <Text
              fontFamily={"roboto"}
              fontWeight={"700"}
              fontSize={"20px"}
              lineHeight={"22px"}
              color={"#37a169"}
            >
              Заказ успешно оформлен
            </Text>

            <Text
              fontFamily={"roboto"}
              fontWeight={"400"}
              fontSize={"16px"}
              lineHeight={"22px"}
              color={"rgba(54, 54, 54, 1)"}
              textAlign={"center"}
            >
              Вы будете перенаправлены на главную страницу через {delay}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
