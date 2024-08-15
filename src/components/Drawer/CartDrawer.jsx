"use client";
import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import CartBtn from "../ui/CartBtn";
import CartItem from "../ui/CartItem";
import CustomButton from "../ui/CustomButton";
import { useCart } from "@/lib/context-api";
import EmptyCart from "../ui/EmptyCart";
import LoginModal from "../Modals/Login";
import BonusCartItem from "../Bonus/BonusCartItem";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/lib/navigation";

const formatToTwoDecimalPlaces = (num) => {
  // Convert to string with a fixed number of decimal places, then truncate
  return (Math.floor(num * 100) / 100).toFixed(2);
};

const priceStyles = {
  fontFamily: "roboto",
  fontWeight: "700",
  fontSize: { base: "20px", lg: "22px" },
  color: "main",
};

const CartDrawer = ({ textBlack, fixed,closeMenu }) => {
  const t = useTranslations("Common");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const path = usePathname();
  const {
    cart,
    deleteItem,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
    getTotalQuantity,
    isAuthenticated,
    bonusCart,
    cashback,
  } = useCart();

  function handleCheckout() {
    onClose();
    router.push("/checkout");
  }

  if (path.includes("checkout") && fixed) {
    return null;
  }

  function countCashback() {
    const cashbackValue = cashback / 100;
    return formatToTwoDecimalPlaces(getTotalPrice() * cashbackValue);
  }

  return (
    <Box>
      <CartBtn textBlack={textBlack} fn={onOpen} fixed={fixed} />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton _focus={{ boxShadow: "none" }} />
          <DrawerBody>
            {cart.length || bonusCart.length ? (
              <>
                <Text
                  fontFamily={"roboto"}
                  fontSize={"24px"}
                  fontWeight={"500"}
                  color={"fontgray"}
                  my={"20px"}
                >
                  {getTotalQuantity()} товаров на {getTotalPrice()} сом
                </Text>
                {bonusCart.length > 0 && (
                  <Flex flexDir={"column"} gap={"16px"}>
                    {bonusCart.map((item, index, arr) => (
                      <BonusCartItem
                        key={item.bonusId}
                        product={item}
                        isLast={arr.length - 1 === index}
                      />
                    ))}
                  </Flex>
                )}

                <Flex flexDir={"column"} gap={"16px"}>
                  {cart.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      deleteItem={deleteItem}
                      increaseQuantity={increaseQuantity}
                      decreaseQuantity={decreaseQuantity}
                    />
                  ))}
                </Flex>
                <Flex
                  flexDir={"column"}
                  position={
                    cart.length + bonusCart.length > 4 ? "sticky" : "absolute"
                  }
                  width={"auto"}
                  left={"24px"}
                  right={"24px"}
                  bottom={"0px"}
                  bg={"rgba(255,255,255,0.9)"}
                >
                  <Flex
                    flexDir={"column"}
                    py={"16px"}
                    borderBottom={"1px solid #E2E2E2"}
                    gap={"8px"}
                    fontFamily={"roboto"}
                    fontWeight={"600"}
                    fontSize={"12px"}
                    color={"#000"}
                  >
                    <Flex
                      flexDir={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Text>{getTotalQuantity()} товаров</Text>

                      <Text>{getTotalPrice()} сом</Text>
                    </Flex>
                    <Flex
                      flexDir={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Text>{t("bonusAdded")}</Text>

                      <Text>+{countCashback()} </Text>
                    </Flex>
                    <Flex
                      flexDir={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Text>{t("delivery")}</Text>

                      <Text>{t("noAdress")}</Text>
                    </Flex>
                  </Flex>
                  <Flex flexDir={"column"} mb={"16px"}>
                    <Flex
                      py={"16px"}
                      flexDir={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      fontFamily={"roboto"}
                      fontSize={"16px"}
                      fontWeight={"600"}
                      color={"#000"}
                    >
                      <Text>{t("totalAmount")}</Text>

                      <Text>{getTotalPrice()} сом</Text>
                    </Flex>

                    {isAuthenticated ? (
                      <CustomButton text={t("checkout")} fn={handleCheckout} />
                    ) : (
                      <Flex
                        flexDir={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={"16px"}
                        mt={"30px"}
                        width={"100%"}
                      >
                        <Text
                          color={"#475467"}
                          fontFamily={"roboto"}
                          fontSize={"16px"}
                          fontWeight={"400"}
                        >
                          {t("authRequired")}
                        </Text>
                        <LoginModal>
                          <CustomButton text={t("login")} />
                        </LoginModal>
                      </Flex>
                    )}
                  </Flex>
                </Flex>
              </>
            ) : (
              <EmptyCart onClose={onClose} />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default CartDrawer;
