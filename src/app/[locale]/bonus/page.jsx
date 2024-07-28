import BonusProducts from "@/components/Bonus/BonusProducts";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const page = async () => {
  const t = await getTranslations("Bonus");

  return (
    <Container
      maxW={{ base: "container.xl", xl: "1296px" }}
      p={{ base: "20px", xl: "0px" }}
    >
      <Flex flexDir={"row"} gap={{base:'20px',lg:"64px"}} mt={"40px"}>
        <Box
          bg={"rgba(255, 132, 65, 1)"}
          position={"relative"}
          width={{ base: "100%", lg: "calc(50% - 32px)" }}
          aspectRatio={{ base: 358 / 328, lg: 648 / 480 }}
          borderRadius={"30px"}
        >
          <Image
            src="/app-screen.svg"
            fill
            sizes="100%"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              bottom: "0",
              right: "0",
              transform: "translateY(-15%)",
            }}
            alt="app"
          />
          <Text
            fontFamily={"roboto"}
            fontWeight={"600"}
            fontSize={"14px"}
            position={"absolute"}
            bottom={"5px"}
            color={'#fff'}
            left={"10px"}
            right={"10px"}
            textAlign={'center'}
            width={'auto'}
          >
            Еще больше бонусов в нашем приложении
          </Text>
          <Link href="#" />
        </Box>

        <Flex
          flexDir={"column"}
          gap={"20px"}
          p={{ base: "30px", lg: "60px" }}
          alignItems={"center"}
          justifyContent={"center"}
          bg={"rgba(128, 152, 239, 1)"}
          width={{ base: "100%", lg: "calc(50% - 32px)" }}
          borderRadius={"30px"}
          aspectRatio={{ base: 358 / 328, lg: 648 / 480 }}
        >
          <Image src={"/bonus-icon.png"} alt="bonus" width={50} height={50} />
          <Heading>Бонусы</Heading>
          <Text>
            Получайте кэшбек с каждой покупки, копите бонусы и оплачивайте
            следующие покупки бонусами
          </Text>
        </Flex>
      </Flex>
      <Suspense fallback={"Loading..."}>
        <BonusProducts />
      </Suspense>
    </Container>
  );
};

export default page;
