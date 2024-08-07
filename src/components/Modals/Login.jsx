"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading,
  Input,
  FormLabel,
  FormControl,
  Button,
  HStack,
  PinInput,
  PinInputField,
  Text,
  Flex,
  Spinner,
  Box,
} from "@chakra-ui/react";
import ProfileBtn from "../ui/ProfileBtn";
import CustomButton from "../ui/CustomButton";
import { useEffect, useState } from "react";
import { ENDPOINTS } from "@/api/endpoints";
import { login } from "@/lib/auth";
import { useCart } from "@/lib/context-api";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/navigation";

const headingStyles = {
  fontWeight: "700",
  fontSize: "18px",
  textAlign: "center",
  color: "fontgray",
};

const labelStyles = {
  fontWeight: "400",
  fontSize: "16px",
  color: "#666666",
};

const inputStyles = {
  border: "1px solid #A0A0A0",
  borderRadius: "10px",
  _focus: {
    borderColor: "#FF8341",
    boxShadow: "0px 0px 0px 1px #FF8341",
  },
  _hover: {
    borderColor: "#FF8341",
  },
};

function LoginModal({ textBlack, closeMenu, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setAuth, isAuthenticated } = useCart();
  const [number, setNumber] = useState("");
  const [isNumberSent, setIsNumberSent] = useState(false);
  const [isOtpConfirming, setIsOtpConfirming] = useState(false);
  const [otp,setOtp] = useState("");
  const router = useRouter();
  const t = useTranslations("Common");
  async function handleOtp(otp) {
    setIsOtpConfirming(true);
    try {
      const res = await fetch(`${ENDPOINTS.postOtp()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: otp }),
      });

      if (res.ok) {
        const data = await res.json();
        login(data);
        setAuth(true);
        onClose();
        setIsOtpConfirming(false);
      }
    } catch (error) {
      setIsOtpConfirming(false);
      throw new Error({ status: error.status || 500 });
    }
  }

  function handleModal() {
    if (!isAuthenticated) {
      onOpen();
    } else {
      closeMenu();
      router.push("/profile?tab=profile");
    }
  }

  return (
    <>
      {children ? (
        <Box w={"100%"} onClick={handleModal}>
          {children}
        </Box>
      ) : (
        <ProfileBtn
          fn={() => handleModal()}
          textBlack={textBlack}
          isAuthenticated={isAuthenticated}
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody
            fontFamily={"roboto"}
            p={"70px 25px"}
            display={"flex"}
            flexDir={"column"}
            gap={"20px"}
          >
            <Heading {...headingStyles}>{t("loginTitle")}</Heading>
            {otp ? <Text>
              {otp}
            </Text> : null}

            {!isNumberSent ? (
              <LoginBox
                number={number}
                setNumber={setNumber}
                setIsNumberSent={setIsNumberSent}
                setOtp = {setOtp}
              />
            ) : (
              <OtpBox
              
                handleOtp={handleOtp}
                setIsNumberSent={setIsNumberSent}
                isOtpConfirming={isOtpConfirming}
                number={number}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginModal;

function OtpBox({ handleOtp, setIsNumberSent, isOtpConfirming, number }) {
  const common = useTranslations("Common");
  const login = useTranslations("Login");

  return (
    <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"}>
      <Text
        fontFamily={"roboto"}
        fontWeight={"400"}
        fontSize={"16px"}
        color={"lightgray"}
      >
        {login("codeSent")}
      </Text>

      <Flex
        mt={"30px"}
        mb={"20px"}
        fontFamily={"roboto"}
        fontSize={"16px"}
        fontWeight={"700"}
        flexDir={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"10px"}
      >
        <Text color={"#475467"}>{number}</Text>
        <Button
          border={"none"}
          _focus={{ border: "none", boxShadow: "none" }}
          bg={"transparent"}
          minW={"unset"}
          minH={"unset"}
          color={"main"}
          onClick={() => setIsNumberSent(false)}
        >
          {common('edit')}
        </Button>
      </Flex>

      {isOtpConfirming ? (
        <Spinner mx={"auto"} />
      ) : (
        <HStack>
          <PinInput otp onComplete={(value) => handleOtp(value)}>
            <PinInputField {...inputStyles} />
            <PinInputField {...inputStyles} />
            <PinInputField {...inputStyles} />
            <PinInputField {...inputStyles} />
          </PinInput>
        </HStack>
      )}

      <Text
        fontFamily={"roboto"}
        fontWeight={"300"}
        fontSize={"16px"}
        textAlign={"center"}
        color={"#475467"}
        mt={"18px"}
      >
        {login("noCode")}
      </Text>
      <Button
        fontFamily={"roboto"}
        mt={"10px"}
        fontWeight={"300"}
        fontSize={"16px"}
        textAlign={"center"}
        color={"#475467"}
        border={"none"}
        _focus={{ border: "none", boxShadow: "none" }}
        bg={"transparent"}
        minW={"unset"}
        minH={"unset"}
      >
        {login("resendCode")}
      </Button>
    </Flex>
  );
}

function LoginBox({ number, setNumber, setIsNumberSent,setOtp }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);
  const t = useTranslations("Common");

  useEffect(() => {
    if (number.length < 13 || number.length > 13) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [number]);

  async function handleLogin() {
    setIsRequesting(true);
    try {
      const res = await fetch(`${ENDPOINTS.postLogin()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone_number: number }),
      });

      if (res.ok) {
        setIsNumberSent(true);
        setIsRequesting(false);
      }

      const data = await res.json();
      setOtp(data.code)
    } catch (error) {
      setIsRequesting(false);
    }
  }

  return (
    <>
      <FormControl>
        <FormLabel {...labelStyles}>{t("loginNumber")}</FormLabel>
        <Input
          {...inputStyles}
          type="tel"
          isRequired={true}
          placeholder="+996 XXX XXX XXX"
          value={number}
          onFocus={() => {
            if (!number) {
              setNumber("+996");
            }
          }}
          onChange={(e) => setNumber(e.target.value)}
        />
      </FormControl>

      <CustomButton
        text={t("login")}
        fn={handleLogin}
        isDisabled={isDisabled}
        isRequesting={isRequesting}
      />
    </>
  );
}
