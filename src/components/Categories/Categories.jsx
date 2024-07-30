import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import CategoryCard from "../ui/CategoryCard";
import { ENDPOINTS } from "@/api/endpoints";

async function getCategories({ locale }) {
  try {
    const res = await fetch(`${ENDPOINTS.getCategories()}`, {
      cache: "no-store",
      headers: {
        "Accept-Language": `${locale}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

const Categories = async ({ locale }) => {
  const data = await getCategories({ locale });
  return (
    <Flex mt={{ base: "62px", lg: "110px" }} flexDir={"column"}>
      <Text
        fontFamily={"roboto"}
        fontSize={{ base: "22px", xl: "36px" }}
        fontWeight={{ base: "600", xl: "700" }}
        textAlign={"center"}
        color={"main"}
      >
        Меню
      </Text>
      <Flex
        flexDir={"row"}
        alignItems={"center"}
        justifyContent={{ base: "center", lg: "flex-start" }}
        flexWrap={"wrap"}
        columnGap={{ base: "10px", lg: "20px" }}
        rowGap={{ base: "30px", lg: "20px" }}
        mt={"30px"}
      >
        {data?.map((category) => (
          <CategoryCard key={category.slug} item={category} />
        ))}
      </Flex>
    </Flex>
  );
};

export default Categories;
