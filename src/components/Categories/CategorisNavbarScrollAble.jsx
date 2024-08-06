"use client";

import { Flex } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import CategoryNavItem from "./CategoryNavItem";
import useIntersectionObserver from "@/lib/Oserver";

const CategorisNavbarScrollAble = ({
  categories,
  onMainPage = false,
  homeLink,
  locale,
}) => {
  const navRefs = useRef([]);

  const [activeCategory, setActiveCategory] = useState(null);

  useIntersectionObserver(setActiveCategory);

  useEffect(() => {
    if (activeCategory && navRefs.current[activeCategory]) {
      navRefs.current[activeCategory].scrollIntoView({
        behavior: "instant",
        inline: "center",
      });
    }
  }, [activeCategory]);

  const handleLinkClick = (slug) => {
    setActiveCategory(slug);
  };

  return (
    <Flex
      h={{ base: "auto", lg: "54px" }}
      _hover={{ height: { base: "auto", lg: "90px" } }}
      flexDir={"row"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      overflowX={"auto"}
      whiteSpace={"nowrap"}
      transition={"all 0.3s ease"}
      role="group"
      w={"100%"}
      maxW={"100dvw"}
      bg={"#fff"}
      gap={"20px"}
      pt={{base:'4px',lg:'0px'}}
      ps={{ base: "1px", lg: "24px" }}
      pe={{ base: "8px", lg: "44px" }}
      sx={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {!onMainPage && <CategoryNavItem data={homeLink} isMain={true} />}
      {categories.map((category) => (
        <div
          ref={(el) => (navRefs.current[category.slug] = el)}
          key={category.id}
        >
          <CategoryNavItem
            activeCategory={activeCategory}
            data={category}
            onMainPage={onMainPage}
            firstSection={categories[0].slug}
            onClickLink={handleLinkClick}
          />
        </div>
      ))}
    </Flex>
  );
};

export default CategorisNavbarScrollAble;
