import { Flex, Text } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";
import React from "react";
import BonusProductItem from "./BonusProductItem";
import { ENDPOINTS } from "@/api/endpoints";
import { v4 as uuidv4 } from "uuid";


async function getBonusProducts() {
  try {
    const res = await fetch(ENDPOINTS.getBonusProducts());
    const data = await res.json();

    if (res.ok) {
      return data;
    }
  } catch (error) {
    throw new Error(error);
  }
}


const BonusProducts = async () => {
  const t = await getTranslations("Bonus");
  const products = await getBonusProducts();


  return (
    <Flex
      flexDir={"column"}
      w={"100%"}
      mt={"50px"}
      bg={
        "linear-gradient(45deg, rgb(21, 178, 241) 0%, rgb(11, 120, 227) 98.04%)"
      }
      borderRadius={'30px'}
    >
      <Text
        fontFamily={"roboto"}
        fontWeight={"600"}
        fontSize={"20px"}
        textAlign={"center"}
        mt={'30px'}
        color={"#fff"}
      >
        {t("Title")}
      </Text>

      <Flex width={"100%"} flexDir={"row"} flexWrap={"wrap"} gap={"20px"} px={'16px'} py={'30px'}>
        {products.map((item) => (
          <BonusProductItem key={item.id} item={item} bonusId={uuidv4()} />
        ))}
      </Flex>
    </Flex>
  );
};

export default BonusProducts;
