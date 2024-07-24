"use client";

import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FormInput from "../ui/FormInput";
import { useRouter, useSearchParams } from "next/navigation";
import CustomButton from "../ui/CustomButton";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { ENDPOINTS } from "@/api/endpoints";

const ProfileInfo = ({ data, token }) => {
  const [name, setName] = useState(data.full_name);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone_number);
  const [dob, setDob] = useState(data.date_of_birth);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (name && email && phone && dob) {
      setIsDisabled(false);
    }
  }, [name, email, phone, dob]);

  async function handleUserInfo() {
    setIsRequesting(true);

    try {
      const res = await fetch(`${ENDPOINTS.patchUserProfileInfo()}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": `${searchParams.get("locale")}`,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          full_name: name,
          email: email,
          date_of_birth: dob,
          first_visit: false,
        }),
      });
      if (res.ok) {
        router.refresh();
        setIsRequesting(false);
      }
    } catch (error) {
      setIsRequesting(false);

      throw new Error(error);
    }
  }

  if (searchParams.get("tab") === "profile") {
    return (
      <Flex
        pos={{ base: "absolute", md: "relative" }}
        top={{ base: "0", md: "unset" }}
        left={{ base: "0", md: "unset" }}
        zIndex={"100"}
        bg={"#fff"}
        flexDir={"column"}
        gap={"20px"}
        boxShadow={"0px 0px 4px 0px rgba(151, 151, 151, 0.25)"}
        borderRadius={"10px"}
        p={"30px"}
        w={{ base: "100%", lg: "400px" }}
        h={"fit-content"}
      >
        <Flex mb={"20px"} flexDir={"row"} gap={"30px"} alignItems={"center"}>
          <Button
            onClick={() => router.push("/profile")}
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
          <Text fontFamily={"roboto"} fontSize={"18px"} fontWeight={"400"}>
            Личные данные
          </Text>
        </Flex>
        <FormInput
          title={"Ваше ФИО *"}
          title_en={"Your name *"}
          type={"text"}
          required={true}
          value={name}
          setValue={setName}
        />

        <FormInput
          title={"Email"}
          title_en={"Email"}
          type={"email"}
          required={true}
          value={email}
          setValue={setEmail}
        />

        <FormInput
          title={"Телефон"}
          title_en={"Phone"}
          type={"text"}
          required={true}
          value={phone}
          isReadOnly={true}
          setValue={setPhone}
        />
        <FormInput
          title={"Дата рождения"}
          title_en={"Date of birth"}
          type={"date"}
          required={true}
          value={dob}
          setValue={setDob}
        />

        <CustomButton
          fn={handleUserInfo}
          text={"Сохранить"}
          isDisabled={isDisabled}
          isRequesting={isRequesting}
        />
      </Flex>
    );
  } else {
    return null;
  }
};

export default ProfileInfo;
