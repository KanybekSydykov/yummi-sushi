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
import Image from "next/image";
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
            py={'60px'}
            minH={'400px'}
            minWidth={"600px"}
            pos={'relative'}
          >
            {/* <CheckIcon boxSize={50} color="green.500" /> */}
            <Image src={'/animated-checkmark.gif'} fill sizes="100%" />
            <Text
              fontFamily={"roboto"}
              fontWeight={"700"}
              fontSize={"20px"}
              lineHeight={"22px"}
              color={"#FFF"}
              position={'absolute'}
              bottom={'50px'}
              left={'0px'}
              right={'0px'}
              textAlign={'center'}
              w={'100%'}
            >
              Заказ успешно оформлен
            </Text>

            <Text
              fontFamily={"roboto"}
              fontWeight={"400"}
              fontSize={"16px"}
              lineHeight={"22px"}
              textAlign={"center"}
              color={"#FFF"}
              position={'absolute'}
              bottom={'20px'}
              left={'0px'}
              right={'0px'}
              w={'100%'}
            >
              Вы будете перенаправлены на главную страницу через {delay}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
