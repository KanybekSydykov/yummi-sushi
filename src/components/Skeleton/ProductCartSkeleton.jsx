import { Flex, Box, AspectRatio, Image, Heading, Text, SkeletonCircle, SkeletonText, Skeleton } from "@chakra-ui/react";
const productNameStyles = {
    fontFamily: "roboto",
    fontWeight: "600",
    fontSize: { base: "16px", lg: "18px" },
    color: "#0a0a0a",
    h: "43px",
    noOfLines: { base: 3, lg: 2 },
  };
  
  const priceStyles = {
    fontFamily: "roboto",
    fontWeight: "700",
    fontSize: { base: "20px", lg: "22px" },
    color: "main",
  };
  
  const discountStyles = {
    fontFamily: "roboto",
    fontWeight: "400",
    fontSize: { base: "18px", lg: "20px" },
    color: "lightgray",
    textDecoration: "line-through",
  };
  
  const descriptionStyles = {
    fontFamily: "roboto",
    fontWeight: "400",
    fontSize: { base: "14px", lg: "16px" },
    color: "fontgray",
  };
  
  
  const cardStyles = {
    flexDir: { base: "row", lg: "column" },
    flexWrap: "wrap",
    justifyContent: { base: "flex-start", lg: "space-between" },
    borderRadius: "20px",
    bg: "rgba(249,250,251,0.75)",
    width: { base: "100%", lg: "240px" },
    overflow: "hidden",
    transition: "all 0.3s ease-in-out",
    boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)",
    _hover: {
      boxShadow: "0px 0px 4px 2px rgba(0, 0, 0, 0.25)",
      bg: "rgba(249,250,251,1)",
    },
    cursor: "pointer",
  };
  
  const imageStyles = {
    ratio: 1,
    width: { base: "158px", lg: "240px" },
    height: { base: "100%", lg: "240px" },
    position: "relative",
    transition: "transform 0.15s ease-out",
  };
const ProductCardSkeleton = () => {
  return (
    <Flex {...cardStyles}>
      <Box
        overflow={"hidden"}
        w={{ base: "158px", lg: "240px" }}
        h={{ base: "auto", lg: "240px" }}
        flexShrink={0}
      >
          <SkeletonCircle width={'100%'} height={'100%'} borderRadius={'20px'} />
      </Box>

      <Flex
        p={{ base: "6px 12px", lg: "16px" }}
        flexDir={"column"}
        gap={"16px"}
        h={{ base: "auto", lg: "244px" }}
        justifyContent={{ base: "flex-start", lg: "space-between" }}
        maxW={{ base: "158px", lg: "240px" }}
      >
        <SkeletonText noOfLines={1} />

        <Flex
          flexDir={"row"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={"16px"}
          display={{ base: "none", lg: "flex" }}
        >
          <SkeletonText noOfLines={1}  width={'40%'}  />
          <SkeletonText noOfLines={1}  w={'40%'}/>
        </Flex>

        <SkeletonText noOfLines={{ base: 3, lg: 2 }} {...descriptionStyles} />

        <Skeleton h={'65px'} borderRadius={'20px'} width={"100%"} mb={'10px'} color={'orange.500'}>
        </Skeleton>
      </Flex>
   
    </Flex>
  );
};

export default ProductCardSkeleton;
