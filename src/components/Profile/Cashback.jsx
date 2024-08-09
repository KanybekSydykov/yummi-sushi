"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import GoBack from "../ui/GoBack";
import { ENDPOINTS } from "@/api/endpoints";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SpinnerBox from "../ui/SpinnerBox";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";

const Cashback = ({ token }) => {
  const [bonus, setBonus] = useState(null);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("Bonus");
  async function getBonusAmount(token) {
    setIsLoading(true);
    try {
      const res = await fetch(`${ENDPOINTS.getBonusAmount()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setBonus(data.bonus);
        setIsLoading(false);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    getBonusAmount(token);
  }, []);

  if (searchParams.get("tab") !== "cashback") {
    return null;
  } else
    return (
      <Box pos={"relative"} minW={"100%"} minH={"100%"}>
        {isLoading ? (
          <SpinnerBox />
        ) : (
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
            <Flex
              mb={"20px"}
              flexDir={"row"}
              gap={"30px"}
              alignItems={"center"}
            >
              <GoBack />
              <Text fontFamily={"roboto"} fontSize={"18px"} fontWeight={"400"}>
                {t("yourBonus")}
              </Text>
            </Flex>

            <Flex flexDir={"row"} alignItems={"center"}>
              <Text
                fontFamily={"roboto"}
                fontSize={"18px"}
                fontWeight={"500"}
                color={"fontgray"}
              >
                {t("earnedBonus")}
              </Text>
              <Text
                fontSize={"22px"}
                fontFamily={"roboto"}
                color={"main"}
                fontWeight={"700"}
                ml={"5px"}
              >
                {bonus ? bonus : 0}
              </Text>
            </Flex>

            <Link
              href={"/profile?tab=orders"}
              style={{
                color: "#FF8341",
                fontWeight: "bold",
                textDecoration: "underline",
                marginTop: "20px",
                fontFamily: "var(--chakra-fonts-roboto)",
              }}
            >
              {t("history")}
            </Link>

            <Flex flexDir={"column"} mt={"40px"}>
              <Text
                textAlign={"center"}
                fontFamily={"roboto"}
                fontWeight={"700"}
                fontSize={"22px"}
              >
                {t("appDownload")}
              </Text>

              <Flex
                flexDir={"row"}
                width={"100%"}
                maxW={"350px"}
                justifyContent={"space-between"}
                alignItems={"center"}
                mt={"30px"}
                pos={"relative"}
                mx={"auto"}
              >
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

                <Link
                  href={"https://play.google.com/store/apps/details?id=com.tatadev.yummi_sushi"}
                  target={"_blank"}
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Flex>
            </Flex>
          </Flex>
        )}
      </Box>
    );
};

export default Cashback;
