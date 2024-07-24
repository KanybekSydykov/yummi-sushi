"use client";

import { Button, Flex, Text } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Image from "next/image";

const Cashback = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  if (searchParams.get("tab") === "cashback") {
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
            onClick={() => router.push('/profile')}
            display={{base:'flex',md:'none'}}
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
            Ваши баллы
          </Text>
        </Flex>

        <Flex flexDir={'row'} alignItems={'center'} >
          <Text
          fontFamily={"roboto"}
          fontSize={'18px'}
          fontWeight={'500'}
          color={'fontgray'}
          >Накоплено баллов :</Text>
          <Text fontSize={'22px'} fontFamily={'roboto'} color={'main'} fontWeight={"700"} ml={"5px"}>
            0
          </Text>
        </Flex>

        <Link href={"/profile?tab=orders"}
          style={{
            color: "#FF8341",
            fontWeight: "bold",
            textDecoration: "underline",
            marginTop: "20px",
            fontFamily: "var(--chakra-fonts-roboto)",
          }}
        >
          История начисления баллов
        </Link>

        <Flex flexDir={"column"} mt={'40px'}>
          <Text textAlign={'center'} fontFamily={'roboto'} fontWeight={'700'} fontSize={'22px'}>Повышенный кэшбек в нашем приложении</Text>

          <Flex flexDir={"row"} width={'100%'} maxW={'350px'} justifyContent={'space-between'} alignItems={'center'} mt={'30px'} pos={'relative'}>
            <Image
              src={"/appstore.svg"}
              width={140}
              height={41}
              alt="app-download-icon"
            />
            <Image
              src={"/playstore.svg"}
              width={140}
              height={41}
              alt="app-download-icon"
            />

            <Link href={'#'} style={{position: 'absolute', right: 0, top: 0, width: '100%', height: '100%'}}/>
          </Flex>
        </Flex>
      </Flex>
    );
  } else {
    return null;
  }
};

export default Cashback;
