"use client";
import { useRouter } from "@/lib/navigation";
import {
  AspectRatio,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function OrderSuccess({ showModal = false, setShowModal }) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [delay, setDelay] = useState(5);

  useEffect(() => {
    if (showModal) {
      if (delay > 0) {
        // setTimeout(() => setDelay(delay - 1), 1000);
      } else {
        router.push("/");
        setShowModal(false);
      }
    }
  }, [delay, showModal]);

  return (
    <>
      <Modal isOpen={showModal} onClose={onClose} size={{base:'full',lg:"md"}} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color={'main'} size={'lg'} _focus={{
            boxShadow:'none',
            outline:'none'
          }} onClick={() => setShowModal(false)} />
          <ModalBody
            flexDir={"column"}
            gap={"16px"}
            alignItems={"center"}
            justifyContent={"center"}
            display={"flex"}
            py={'60px'}
            bg={'#003241'}
            overflow={'hidden'}
          
          >
            {/* <CheckIcon boxSize={50} color="green.500" /> */}
            <AspectRatio
              minH={{base:'unset',lg:'400px'}}
              maxH={{base:'250px',lg:'400px'}}
              minWidth={{base:'100%',lg:"600px"}}
              overflow={'hidden'}
              pos={'relative'}
            >

            <Image src={'/animated-checkmark.gif'} fill sizes="100%" />
            </AspectRatio>
            <Text
              fontFamily={"roboto"}
              fontWeight={"700"}
              fontSize={"20px"}
              lineHeight={"22px"}
              color={"#FFF"}
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
