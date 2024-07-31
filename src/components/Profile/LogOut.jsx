"use client";

import { logout } from "@/lib/auth";
import { useCart } from "@/lib/context-api";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const LogOut = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setAuth } = useCart();
  const t = useTranslations("Logout");

  useEffect(() => {
    if (searchParams.get('tab') === "logout") {
      onOpen();
    }
  }, [searchParams]);

  function handleLogout() {
    setAuth(false);
    logout();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"sm"} isCentered>
        <ModalOverlay />
        <ModalContent p={'20px'}>
          <ModalBody>
            <Text
              fontFamily={"roboto"}
              fontWeight={"600"}
              fontSize={"20px"}
              textAlign={"center"}
              p={'16px'}
            >
{t('logout')}
            </Text>
          </ModalBody>

          <ModalFooter justifyContent={"space-between"} gap={"30px"}>
            <Button
              bg={"#fff"}
              _hover={{ bg: "#fff" }}
              _focus={{ bg: "#fff" }}
              h={"60px"}
              w={"100%"}
              color={"main"}
              mr={3}
              p={0}
              fontFamily={"roboto"}
              fontWeight={"400"}
              fontSize={"20px"}
              boxShadow={"0px 0px 4px 0px rgba(151, 151, 151, 0.55)"}
              borderRadius={"10px"}
              onClick={() => {
                onClose();
                router.push("/profile");
              }}
            >
              {t('no')}
            </Button>
            <Button
              bg={"rgba(255,30,30,0.75)"}
              _hover={{ bg: "rgba(255,30,30,1)" }}
              _focus={{ bg: "rgba(255,30,30,1)" }}
              h={"60px"}
              w={"100%"}
              color={"#fff"}
              mr={3}
              p={0}
              fontFamily={"roboto"}
              fontWeight={"400"}
              fontSize={"20px"}
              boxShadow={"0px 0px 4px 0px rgba(151, 151, 151, 0.55)"}
              borderRadius={"10px"}
              onClick={handleLogout}
            >
              {t('yes')}
            </Button>
            {/* <Link
              href="/logout"
              style={{
                height: "60px",
                background: "red",
                color: "white",
                width: "100%",
                boxShadow: "0px 0px 4px 0px rgba(151, 151, 151, 0.25)",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "var(--chakra-fonts-roboto)",
                fontWeight: "400",
                fontSize: "20px",
                textAlign: "center",
              }}
            >
              Выйти
            </Link> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LogOut;
