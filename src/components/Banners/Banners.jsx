'use client'
import React, { useState } from "react";
import { Box, Flex, Button, useMediaQuery, Spinner } from "@chakra-ui/react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Image from "next/image";
import "@splidejs/react-splide/css";
import Link from "next/link";

const BannerSlider = ({ banners}) => {
  const [loading,setLoading] = useState(true)

  function onImageLoad(){
    setLoading(false)
  }
  return (
    <>
      <Box
        as={Splide}
        aria-label="My Favorite Images"
        hasTrack={false}
        options={{
          type: "slide",
          loop: true,
          pagination: false,
          speed: 1000,
          drag: "free",
          snap: true,
          mediaQuery: "min",
        }}
        w={"100%"}
        h={"100%"}
      >
        <Box as={SplideTrack} w={"100%"} h={"100%"}>
          {banners?.map((item, index) => (
            <SplideSlide key={index}>
              <Box pos={"relative"} w={"100%"} h={"100%"} borderRadius={"30px"} overflow={"hidden"} aspectRatio={{base:358/350,lg:1296/400}} position={'relative'}>
              <Box pos={"absolute"} w={"100%"} h={"100%"} zIndex={1} display={{base:"none",lg:"block"}}>
              <Image
                  src={loading ? "/banner-placeholder.avif" : item.image_desktop}
                  alt={item.title}
                  fill
                  priority
                  onLoad={onImageLoad}
                  sizes="100%"
                />
              </Box>
              <Box pos={"absolute"} w={"100%"} h={"100%"} zIndex={1} display={{base:"block",lg:"none"}}>
              <Image
                  src={loading  ? "/banner-placeholder.avif" : item.image_mobile}
                  alt={item.title}
                  fill
                  priority
                  onLoad={onImageLoad}
                  sizes="100%"
                />
              </Box>
              {loading && <Spinner position={'absolute'} top={'50%'} left={'50%'} transform={'translate(-50%,-50%)'} zIndex={2} color={'#ff8341'} size={'xl'} />}
              <Link href={item.link} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, width: "100%", height: "100%" }} />
       
              </Box>
            </SplideSlide>
          ))}
        </Box>
        <Flex
          className="splide__arrows"
          position={"absolute"}
          top={{ base: "102%", lg: "calc(50% - 12px)" }}
          left={0}
          w={"100%"}
          h={{ base: "32px", lg: "0px" }}
          zIndex={3}
        >
          <Button
            className="splide__arrow splide__arrow--prev"
            w={{ base: "32px", lg: "48px" }}
            h={{ base: "32px", lg: "48px" }}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={"50%"}
            position={"absolute"}
            p={0}
            opacity={"1"}
            top={0}
            right={"unset"}
            left={{ base: "calc(100% - 75px)", lg: "16px" }}
            minW={"unset"}
            boxShadow={"0 0 2.67px 2px rgba(130, 130, 130, 0.25)"}
            transform={"none"}
            bg={"#fff"}
            _disabled={{
              opacity: "0.7 !important",
              display: "flex",
            }}
            _hover={{
              bg: "orange",
            }}
          >
            <Image
              src={"/banner_arrow.svg"}
              width={7}
              height={12}
              alt={"arrow"}
              loading="lazy"
              style={{
                width: "7px",
                height: "12px",
                transform: "rotate(-180deg)",
              }}
            />
          </Button>

          <Button
            className="splide__arrow splide__arrow--next"
            w={{ base: "32px", lg: "48px" }}
            h={{ base: "32px", lg: "48px" }}
            display={"flex"}
            justifyContent={"center"}
            p={0}
            alignItems={"center"}
            position={"absolute"}
            borderRadius={"50%"}
            opacity={"1"}
            top={0}
            zIndex={10}
            minW={"unset"}
            right={{ base: "0", lg: "16px" }}
            left={"unset"}
            boxShadow={"0 0 2.67px 2px rgba(130, 130, 130, 0.25)"}
            transform={"none"}
            bg={"#fff"}
            _disabled={{
              opacity: "0.7 !important",
              display: "flex",
            }}
            _hover={{
              bg: "orange",
            }}
          >
            <Image
              src={"/banner_arrow.svg"}
              width={7}
              height={12}
              alt={"arrow"}
              style={{
                width: "7px",
                height: "12px",
              }}
            />
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default BannerSlider;
