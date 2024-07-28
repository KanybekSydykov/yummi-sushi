'use server'

import React from "react";
import { Flex, Box, List, ListItem, Text, Container } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../ui/Logo";
import { ENDPOINTS } from "@/api/endpoints";

const getFooterData = async(locale) =>{
  const res = await fetch(`${ENDPOINTS.getContacts()}`, {
    cache: 'no-cache',
    headers: {
        'Accept-Language': `${locale}`,
    }
})
const data = await res.json()
const footerData = { phones: data.phones, emails: data.emails, socials: data.social_links, payment: data.payment_methods }

return footerData 
}

const Footer = async({  locale }) => {

  const data = await getFooterData(locale)

  return (
    <>
      <Container
        maxW={"unset"}
        bg={"rgba(33, 37, 40, 1)"}
        borderRadius={"10px 10px 0 0"}
        pt={"40px"}
        pb={"50px"}
      >
        <Flex
          flexDir={{ base: "column", md: "row" }}
          gap={{ base: "70px", lg: "20px", xl: "50px" }}
          maxW={{ base: "1200px", xl: "1472px" }}
          mx={"auto"}
          justifyContent={{ base: "unset", lg: "space-between" }}
          flexWrap={{ base: "wrap", lg: "nowrap" }}
        >
          <Box minW={"92px"}>
            <Logo />
          </Box>

          <List
            display={"flex"}
            fontFamily={"roboto"}
            fontWeight={"300"}
            fontSize={"18px"}
            lineHeight={"27px"}
            gap={"20px"}
            color={"rgba(249, 249, 249, 1)"}
            flexDir={"column"}
          >
            <ListItem>
              <Link href={`/`}>
                {locale === "ru" ? "О нас" : "About us"}
              </Link>
            </ListItem>
            <ListItem>
              <Link href={`/`}>
                {locale === "ru" ? "Доставка" : "Delivery"}
              </Link>
            </ListItem>
            <ListItem>
              <Link href={`/`}>
                {locale === "ru"
                  ? "Политика конфиденциальности"
                  : "Privacy policy"}
              </Link>
            </ListItem>
            <ListItem>
              <Link href={`/`}>
                {locale === "ru" ? "Возврат средств" : "Refund"}
              </Link>
            </ListItem>
            <ListItem>
              <Link href={`/`}>
                {locale === "ru" ? "Процесс оплаты" : "Payment process"}
              </Link>
            </ListItem>
          </List>

          <List
            fontFamily={"roboto"}
            fontWeight={"300"}
            fontSize={"18px"}
            lineHeight={"27px"}
            gap={"20px"}
            color={"rgba(249, 249, 249, 1)"}
          >
            <Text
              fontFamily={"roboto"}
              fontWeight={"700"}
              fontSize={"20px"}
              lineHeight={"23.44px"}
              color={"#fff"}
            >
              {locale === "ru" ? " Тех.поддержка" : "Support"}
            </Text>
            {data.phones?.map((item, index) => (
              <ListItem
                as={Link}
                href={`tel:${item.phone}`}
                display={"block"}
                target="_blank"
                key={item.phone}
                mt={"26px"}
              >
                {item.phone}
              </ListItem>
            ))}
            {data.emails?.map((item, index) => (
              <ListItem
                key={item.email}
                as={Link}
                display={"block"}
                href={`mailto:${item.email}`}
                target="_blank"
                mt={"20px"}
              >
                {item.email}
              </ListItem>
            ))}
          </List>

          <Flex flexDir={"column"} gap={"20px"}>
            <Text
              fontFamily={"roboto"}
              fontWeight={"700"}
              fontSize={"20px"}
              lineHeight={"23.44px"}
              color={"#fff"}
            >
              {locale === "ru" ? " Наши соцсети" : "Social networks"}
            </Text>
            <Flex flexDir={"row"} flexWrap={"wrap"} gap={"12px"}>
              {data.socials?.map((item) => (
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  bg={"#fff"}
                  w={"40px"}
                  h={"40px"}
                  borderRadius={"10px"}
                  key={item.link}
                  cursor={"pointer"}
                  position={"relative"}
                  p={"0 2px"}
                >
                  <Image
                    src={item.icon}
                    alt={`icon for ${item.link}`}
                    width={20}
                    height={20}
                    style={{
                      width: "20px",
                      height: "auto",
                      maxHeight: "20px",
                      borderRadius: "2px",
                    }}
                  />
                  <Link
                    key={item.link}
                    href={item.link}
                    target={"_blank"}
                    rel="noreferrer"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Flex>
              ))}
            </Flex>
          </Flex>
          <Flex flexDir={"column"} gap={"20px"}>
            <Text
              fontFamily={"roboto"}
              fontWeight={"700"}
              fontSize={"20px"}
              lineHeight={"23.44px"}
              color={"#fff"}
            >
              {locale === "ru" ? " СПОСОБЫ ОПЛАТЫ" : "Payment methods"}
            </Text>
            <Flex flexDir={"row"} flexWrap={"wrap"} gap={"12px"}>
              {data.payment?.map((item) => (
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  bg={"#fff"}
                  w={"40px"}
                  h={"40px"}
                  borderRadius={"10px"}
                  key={item.link}
                  cursor={"pointer"}
                  position={"relative"}
                  p={"0 2px"}
                >
                  <Image
                    src={item.icon}
                    alt="vk icon"
                    width={36}
                    height={12}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "40px",
                      objectFit: "contain",
                    }}
                  />
                  <Link
                    key={item.link}
                    href={item.link}
                    target={"_blank"}
                    rel="noreferrer"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default Footer;
