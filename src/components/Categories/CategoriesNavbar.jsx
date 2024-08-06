import { Container, Flex } from "@chakra-ui/react";
import CategoryNavItem from "./CategoryNavItem";
import { ENDPOINTS } from "@/api/endpoints";
import CategorisNavbarScrollAble from "./CategorisNavbarScrollAble";

async function getCategories(locale) {
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

const homeLink = {
  image: "/home-icon.png",
  slug: "/",
  name: "Главная",
};

const CategoriesNavbar = async ({ locale, onMainPage = false }) => {
  const categories = await getCategories(locale);

  return (
    <Container
      maxW={{ base: "container.xl", xl: "1296px" }}
      pt={"0px"}
      pb={"8px"}
      mx={{ base: "0px", xl: "auto" }}
      px={'0'}
      width={"100%"}
      position={"sticky"}
      top={"0px"}
      zIndex={"10"}
      bg={"transparent"}
      h={{ base: "auto", lg: "90px" }}
      overflow={"hidden"}
    >
      <CategorisNavbarScrollAble categories={categories} onMainPage={onMainPage} homeLink={homeLink} locale={locale} />
    </Container>
  );
};

export default CategoriesNavbar;
