"use server";

import React from "react";
import { Flex, Box, List, ListItem, Text, Container } from "@chakra-ui/react";
import Image from "next/image";
import Logo from "../ui/Logo";
import { ENDPOINTS } from "@/api/endpoints";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";

const getFooterData = async (locale) => {
  const res = await fetch(`${ENDPOINTS.getContacts()}`, {
    cache: "no-store",
    headers: {
      "Accept-Language": `${locale}`,
    },
  });
  const data = await res.json();
  const footerData = {
    phones: data.phones,
    emails: data.emails,
    socials: data.social_links,
    payment: data.payment_methods,
    static_pages: data.static_pages,
  };

  return footerData;
};

const Footer = async ({ locale }) => {
  const data = await getFooterData(locale);

  const t = await getTranslations("HomePage");

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
            fontSize={"18px"}
            lineHeight={"27px"}
            gap={"20px"}
            color={"rgba(249, 249, 249, .75)"}
            flexDir={"column"}
            fontWeight={"300"}
          >
            {data.static_pages.map((item) => (
              <ListItem
                key={item.slug}
                transition={"all 0.3s ease"}
                _hover={{
                  transform: "translate3d(0, -3px, .01px)",
                  transformStyle: "preserve-3d",
                  color: "#fff",
                  filter:"brightness(200%)"
                }}
              >
                <Link href={`/info/${item.slug}`} style={{
                  display:'block',
                  width:'100%',
                }}>{item.title}</Link>
              </ListItem>
            ))}
          </List>

          <List
            fontFamily={"roboto"}
            fontWeight={"300"}
            fontSize={"18px"}
            lineHeight={"27px"}
            gap={"20px"}
            color={"rgba(249, 249, 249, .75)"}
          >
            <Text
              fontFamily={"roboto"}
              fontWeight={"700"}
              fontSize={"20px"}
              lineHeight={"23.44px"}
              color={"#fff"}
            >
              {t("support")}
            </Text>
            {data.phones?.map((item, index) => (
              <ListItem
                display={"block"}
                key={item.phone}
                mt={"26px"}
                position={"relative"}
                transition={"all 0.3s ease"}
                _hover={{
                  transform: "translate3d(0, -3px, .01px)",
                  transformStyle: "preserve-3d",
                  color: "#fff",
                  filter:"brightness(200%)"
                }}
              >
                <Link
                  href={`tel:${item.phone}`}
                  target="_blank"
                  style={{
                    textDecoration: "none",
                    display:"block",
                    width:'100%',
                  }}
                >
                  {item.phone}
                </Link>
              </ListItem>
            ))}
            {data.emails?.map((item, index) => (
              <ListItem
                key={item.email}
                display={"block"}
                mt={"20px"}
                position={"relative"}
                transition={"all 0.3s ease"}
                _hover={{
                  transform: "translate3d(0, -3px, .01px)",
                  transformStyle: "preserve-3d",
                  color: "#fff",
                  filter:"brightness(200%)"
                }}
              >
                <Link
                  href={`mailto:${item.email}`}
                  target="_blank"
                  style={{
                    textDecoration: "none",
                    display:"block",
                    width:'100%',
                  }}
                >
                  {item.email}
                </Link>
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
              {t("social")}
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
                  transition={"all 0.3s ease"}
                  _hover={{
                    transform: "translate3d(0, -3px, .01px)",
                    transformStyle: "preserve-3d",
                    color: "#fff",
                    filter:"brightness(200%)"
                  }}
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
              {t("payment")}
            </Text>
            <Flex flexDir={"row"} maxW={"300px"} flexWrap={"wrap"} gap={"12px"}>
              {data.payment?.map((item) => (
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  w={"fit-content"}
                  h={"auto"}
                  key={item.link}
                  cursor={"pointer"}
                  position={"relative"}
                  transition={"all 0.3s ease"}
                  _hover={{
                    transform: "translate3d(0, -3px, .01px)",
                    transformStyle: "preserve-3d",
                    color: "#fff",
                    filter:"brightness(125%)"
                  }}
                >
                  <Image
                    src={item.icon}
                    alt="vk icon"
                    width={100}
                    height={100}
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
