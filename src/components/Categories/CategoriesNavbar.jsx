import { Container, Flex } from "@chakra-ui/react";
import CategoryNavItem from "./CategoryNavItem";
import { ENDPOINTS } from "@/api/endpoints";

async function getCategories(locale) {
  try {
    const res = await fetch(`${ENDPOINTS.getCategories()}`,{
      cache: 'no-store',
      headers: {
        'Accept-Language': `${locale}`,
      }
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

const homeLink = {
  image:"/logo.png",
  slug:'/',
  name:"Главная"
}

const CategoriesNavbar = async ({ locale }) => {
  const categories = await getCategories(locale);

  return (
    <Container
      maxW={{ base: "container.xl", xl: "1296px" }}
      py={"16px"}
      mt={'16px'}
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
      <CategoryNavItem data={homeLink} isMain={true} />
      {categories.map((category) => (
        <CategoryNavItem key={category.id} data={category} />
      ))}
    </Container>
  );
};

export default CategoriesNavbar;
