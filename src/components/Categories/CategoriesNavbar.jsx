import { Container, Flex } from "@chakra-ui/react";
import CategoryNavItem from "./CategoryNavItem";
import { ENDPOINTS } from "@/api/endpoints";

async function getCategories() {
  try {
    const res = await fetch(`${ENDPOINTS.getCategories()}`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

const CategoriesNavbar = async () => {
  const categories = await getCategories();

  return (
    <Container
      maxW={{ base: "container.xl", xl: "1296px" }}
      pt={"16px"}
      px={{ base: "16px", xl: "0px" }}
      width={"100%"}
      position={"sticky"}
      top={"0px"}
      zIndex={"10"}
      flexDir={"row"}
      bg={"rgba(255,255,255,0.75)"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      gap={"20px"}
      overflowX={"auto"}
      display={"flex"}
    >
      {categories.map((category) => (
        <CategoryNavItem key={category.id} data={category} />
      ))}
    </Container>
  );
};

export default CategoriesNavbar;
