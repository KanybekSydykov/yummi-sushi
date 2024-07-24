"use client";
import { usePathname } from "@/lib/navigation";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const ProfileNav = () => {
  const path = usePathname();
  const searchParams = useSearchParams();

  return (
    <Flex
      flexDir={"column"}
      boxShadow={"0px 0px 4px 0px rgba(151, 151, 151, 0.25)"}
      borderRadius={"10px"}
      h={'max-content'}
    >
      <Flex
        flexDir={"row"}
        gap={"10px"}
        alignItems={"center"}
        p={"14px 20px"}
        pos={"relative"}
        boxShadow={"0px 0px 4px 0px rgba(151, 151, 151, 0.25)"}
        bg={searchParams.get("tab") === "profile" ? "rgba(255, 131, 65, 0.2)" : "transparent"}
        transition={"all 0.3s ease"}
      >
        <Link
          href={path + "?tab=profile"}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <Image src={"/profile-icon.svg"} alt="profile" width={20} height={20} />
        <Text>Личные данные</Text>
      </Flex>
      <Flex
        flexDir={"row"}
        gap={"10px"}
        alignItems={"center"}
        p={"14px 20px"}
        pos={"relative"}
        boxShadow={"0px 0px 4px 0px rgba(151, 151, 151, 0.25)"}
        bg={searchParams.get("tab") === "cashback" ? "rgba(255, 131, 65, 0.2)" : "transparent"}
        transition={"all 0.3s ease"}
      >
        <Link
          href={path + "?tab=cashback"}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <Image src={"/cashback.svg"} alt="profile" width={20} height={20} />
        <Text>Кэшбек</Text>
      </Flex>
      <Flex
        flexDir={"row"}
        gap={"10px"}
        alignItems={"center"}
        p={"14px 20px"}
        pos={"relative"}
        boxShadow={"0px 0px 4px 0px rgba(151, 151, 151, 0.25)"}
        bg={searchParams.get("tab") === "orders" ? "rgba(255, 131, 65, 0.2)" : "transparent"}
        transition={"all 0.3s ease"}
      >
        <Link
          href={path + "?tab=orders"}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <Image src={"/orders-icon.svg"} alt="profile" width={20} height={20} />
        <Text>Мои заказы</Text>
      </Flex>
      <Flex
        flexDir={"row"}
        gap={"10px"}
        alignItems={"center"}
        p={"14px 20px"}
        pos={"relative"}
        boxShadow={"0px 0px 4px 0px rgba(151, 151, 151, 0.25)"}
        bg={searchParams.get("tab") === "logout" ? "rgba(255, 131, 65, 0.2)" : "transparent"}
        transition={"all 0.3s ease"}
      >
        <Link
          href={path + "?tab=logout"}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <Image src={"/log-out-icon.svg"} alt="profile" width={20} height={20} />
        <Text>Выйти</Text>
      </Flex>
    </Flex>
  );
};

export default ProfileNav;
