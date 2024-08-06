"use client";
import {
  background,
  border,
  Box,
  Button,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CartItem from "../ui/CartItem";
import DeliveryMethod from "../Modals/DeliveryMethod";
import CustomButton from "../ui/CustomButton";
import { useCart } from "@/lib/context-api";
import DeliveryPrice from "./DeliveryPrice";
import AdressModal from "../Modals/AddAdress";
import { ENDPOINTS } from "@/api/endpoints";
import FormInput from "../ui/FormInput";
import { useParams, useRouter } from "next/navigation";
import BonusCartItem from "../Bonus/BonusCartItem";
import { motion, useAnimate } from "framer-motion";
import OrderSuccess from "../Modals/OrderSuccess";
import { useTranslations } from "next-intl";

const DELIVERY_OPTIONS = ["Самовывоз", "Доставка"];

const formatToTwoDecimalPlaces = (num) => {
  // Convert to string with a fixed number of decimal places, then truncate
  return (Math.floor(num * 100) / 100).toFixed(2);
};

function countCashback(val) {
  let cashbackValue = 2.5 / 100;
  return formatToTwoDecimalPlaces(val * cashbackValue);
}

const getAdressString = (item) => {
  return `${item.city}, ${item.entrance ? `, подъезд ${item.entrance}` : ""} ${
    item.floor ? `, этаж ${item.floor}` : ""
  } ${item.intercom ? `, домофон ${item.intercom}` : ""} `;
};

const Checkout = ({ defaultAddress, token, branches }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deliveryMethod, setDeliveryMethod] = useState("Доставку");
  const {
    cart,
    deleteItem,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
    getTotalQuantity,
    clearCart,
    bonusCart,
  } = useCart();
  const [selectedAdressId, setSelectedAdressId] = useState(
    defaultAddress ? defaultAddress.id : null
  );
  const [scope, animate] = useAnimate();
  const [deliveryPrice, setDeliveryPrice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [selectedAdress, setSelectedAdress] = useState(
    defaultAddress ? defaultAddress : null
  );
  const [selectedRestaurant, setSelectedRestaurant] = useState(
    branches ? branches[0] : null
  );
  const [change, setChange] = useState(0);
  const [comment, setComment] = useState(" ");
  const toast = useToast();
  const router = useRouter();
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isAdressError, setIsAdressError] = useState(false);
  const t = useTranslations("Common");
  const tCart = useTranslations("Cart");
  const { locale } = useParams();

  function openDeliveryModal(change = false) {
    if (change === false) {
      if (deliveryMethod === "Самовывоз") {
        setDeliveryMethod("Доставку");
      } else {
        setDeliveryMethod("Самовывоз");
      }
    }
    onOpen();
  }

  function handleAdressSelect(id, address) {
    setSelectedAdressId(id);
    setSelectedAdress(address);
  }

  async function createOrder() {
    if (!selectedAdress && scope.current && deliveryMethod === "Доставку") {
      await animate(
        scope.current,
        { x: [-20, 15, -10, 5, 0], border: "1px solid red" },
        { duration: 0.3 }
      );
      toast({
        title: "Адрес доставки не указан",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    if (!deliveryPrice && deliveryMethod === "Доставку") {
      toast({
        title: "Адрес указан не верно",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    const products = cart.map((item) => {
      return {
        product_size_id: item.selectedSize.id,
        quantity: item.quantity,
        topping_ids: item.addons.map((addon) => addon.id),
        is_bonus: false,
      };
    });

    const bonusProducts = bonusCart.map((item) => {
      return {
        product_size_id: item.id,
        quantity: item.quantity,
        is_bonus: true,
      };
    });
    const is_pickup = deliveryMethod === "Самовывоз";
    const restaurant_id = selectedRestaurant.id;
    const body = {
      products: [...products, ...bonusProducts],
      is_pickup,
      delivery: {
        user_address_id: selectedAdress?.id,
      },
      restaurant_id,
      change,
      comment,
      payment_method: paymentMethod,
      order_source: "web",
    };

    try {
      setIsOrdering(true);

      const res = await fetch(ENDPOINTS.postCreateOrder(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        toast({
          title: "Заказ успешно создан",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setChange(0);
        setComment(" ");
        clearCart();
        setOrderSuccess(true);
        setIsOrdering(false);
      }
    } catch (error) {
      setIsOrdering(false);
      throw new Error({ status: error.status || 500 });
    }
  }
  return (
    <Flex
      position={"relative"}
      flexDir={{ base: "column", lg: "row" }}
      flexWrap={"wrap"}
      mt={{ base: "16px", lg: "60px" }}
      mb={{ base: "20px", lg: "100px" }}
      justifyContent={{ base: "flex-start", lg: "space-between" }}
      gap={{ base: "20px", lg: "0px" }}
      fontFamily={"roboto"}
    >
      <Flex
        flexDir={"column"}
        maxW={{ base: "100%", lg: "calc(50% - 30px)" }}
        borderRadius={"10px"}
        border={"1px solid #EAEAEA"}
        p={"30px"}
        height={"fit-content"}
        display={{ base: "none", lg: "flex" }}
      >
        <Text
          textAlign={"center"}
          fontWeight={"700"}
          fontSize={"22px"}
          color={"#000"}
        >
          {t("order")}
        </Text>

        {cart.length > 0 ? (
          <Flex flexDir={"column"} gap={"30px"} mt={"30px"}>
            {bonusCart.length > 0 && (
              <Flex
                flexDir={"column"}
                gap={"16px"}
                pt={"16px"}
                borderTop={bonusCart.length ? "1px solid #E2E2E2" : ""}
              >
                {bonusCart.map((item, index, arr) => (
                  <BonusCartItem
                    key={item.bonusId}
                    product={item}
                    isLast={arr.length - 1 === index}
                  />
                ))}
              </Flex>
            )}
            {cart.map((item, index, arr) => (
              <CartItem
                key={item.id}
                item={item}
                deleteItem={deleteItem}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                isLast={index === arr.length - 1}
              />
            ))}
          </Flex>
        ) : (
          <Text
            textAlign={"center"}
            mt={"30px"}
            color={"#000"}
            fontFamily={"roboto"}
            fontSize={"18px"}
            flexGrow={1}
          >
            {tCart("empty")}
          </Text>
        )}
      </Flex>

      <Flex
        flexGrow={1}
        flexDir={"column"}
        maxW={{ base: "100%", lg: "calc(50% - 30px)" }}
        borderRadius={"10px"}
        border={"1px solid #EAEAEA"}
        p={{ base: "16px", lg: "30px" }}
        h={"fit-content"}
        position={{ base: "relative", lg: "sticky" }}
        top={{ base: "unset", lg: "16px" }}
      >
        <Flex flexDir={locale === "ru" ? "row" : "row-reverse"} gap={'6px'} justifyContent={'center'}>
          <Text
            textAlign={"center"}
            fontFamily={"roboto"}
            fontWeight={{ base: "500", lg: "700" }}
            fontSize={{ base: "18px", lg: "22px" }}
            color={"#000"}
          >
            {t("orderTo")}
          </Text>
          <Text
            textAlign={"center"}
            fontFamily={"roboto"}
            fontWeight={{ base: "500", lg: "700" }}
            fontSize={{ base: "18px", lg: "22px" }}
            color={"#000"}
          >
            {deliveryMethod === 'Самовывоз' ? t('pickup') : t('delivery')}
          </Text>
        </Flex>

        <Flex
          flexDir={{ base: "column", lg: "row" }}
          gap={{ base: "8px", lg: "40px" }}
          mt={{ base: "10px", lg: "20px" }}
        >
          <Text
            width={{ base: "100%", lg: "140px" }}
            flexShrink={0}
            fontSize={{ base: "16px", lg: "18px" }}
            fontWeight={{ base: "500", lg: "600" }}
          >
            {deliveryMethod === "Самовывоз" ? t('restoranAdress') : t('deliveryAdress')}
          </Text>
          <Flex
            ref={scope}
            flexDir={"row"}
            flexWrap={"wrap"}
            borderRadius={"10px"}
            bg={"#f3f3f7"}
            p={"10px"}
            position={"relative"}
          >
            {deliveryMethod === "Доставку" ? (
              <>
                {selectedAdress ? (
                  <Text
                    fontFamily={"roboto"}
                    fontSize={{ base: "12px", lg: "16px" }}
                    fontWeight={{ base: "400", lg: "400" }}
                    width={"75%"}
                  >
                    {getAdressString(selectedAdress)}
                  </Text>
                ) : (
                  <Text
                    fontFamily={"roboto"}
                    fontSize={{ base: "12px", lg: "16px" }}
                    fontWeight={{ base: "400", lg: "400" }}
                    width={"75%"}
                    cursor={"pointer"}
                    onClick={() => openDeliveryModal(true)}
                  >
                    {t("addAdress")}
                  </Text>
                )}
              </>
            ) : (
              <>
                <Text
                  fontFamily={"roboto"}
                  fontSize={{ base: "12px", lg: "16px" }}
                  fontWeight={{ base: "400", lg: "400" }}
                  width={"75%"}
                >
                  {selectedRestaurant.address}
                </Text>
              </>
            )}
            <Text
              onClick={() => openDeliveryModal(true)}
              w={"auto"}
              position={"absolute"}
              top={"10px"}
              right={"10px"}
              color={"main"}
              fontSize={"14px"}
              fontWeight={"600"}
              cursor={"pointer"}
            >
              {t('edit')}
            </Text>

            <Text
              onClick={() => openDeliveryModal(false)}
              w={"100%"}
              textAlign={"right"}
              color={"main"}
              fontSize={"14px"}
              fontWeight={"600"}
              cursor={"pointer"}
              mt={'20px'}
            >
              <span style={{ textTransform: "lowercase" }}>
                {deliveryMethod !== "Доставку" ? t('chooseDelivery') : t('choosePickup')}
              </span>
            </Text>
          </Flex>
        </Flex>

        <Flex
          flexDir={{ base: "column", lg: "row" }}
          gap={{ base: "8px", lg: "40px" }}
          mt={{ base: "10px", lg: "20px" }}
        >
          <Text
            width={{ base: "100%", lg: "140px" }}
            flexShrink={0}
            fontSize={{ base: "16px", lg: "18px" }}
            fontWeight={{ base: "500", lg: "600" }}
          >
            {t("payment")}
          </Text>
          <RadioGroup
            defaultValue={paymentMethod}
            flexDir={"row"}
            flexWrap={"wrap"}
            borderRadius={"10px"}
            bg={"#f3f3f7"}
            p={"10px"}
            flexGrow={1}
            onChange={(e) => setPaymentMethod(e)}
          >
            <Stack>
              <Radio size="md" value="cash" colorScheme="orange">
                <Text
                  fontFamily={"roboto"}
                  fontSize={{ base: "12px", lg: "16px" }}
                  fontWeight={{ base: "400", lg: "400" }}
                >
                 {t('cash')}
                </Text>
              </Radio>
              <Radio size="md" value="card" colorScheme="orange" mt={'12px'}>
                <Text
                  fontFamily={"roboto"}
                  fontSize={{ base: "12px", lg: "16px" }}
                  fontWeight={{ base: "400", lg: "400" }}
                >
                 {t('mbank')}
                </Text>
              </Radio>
            </Stack>
          </RadioGroup>
        </Flex>

        <Flex
          flexDir={"column"}
          py={{ base: "12px", lg: "16px" }}
          borderBottom={"1px solid #E2E2E2"}
          gap={{ base: "4px", lg: "8px" }}
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
            <Text>{t('bonusAdded')}</Text>

            <Text>+{countCashback(getTotalPrice())} </Text>
          </Flex>
          {deliveryMethod === "Доставку" ? (
            <Flex
              flexDir={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Text>{t('delivery')}</Text>
              <DeliveryPrice
                id={selectedAdressId}
                adress={selectedAdress}
                token={token}
                setDeliveryPrice={setDeliveryPrice}
              />
            </Flex>
          ) : null}
        </Flex>
        <Flex flexDir={"column"} mb={{ base: "0px", lg: "16px" }}>
          <Flex
            py={{ base: "12px", lg: "16px" }}
            flexDir={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            fontFamily={"roboto"}
            fontSize={"16px"}
            fontWeight={"600"}
            color={"#000"}
          >
            <Text>{t('totalAmount')}</Text>

            <Text>{+getTotalPrice() + deliveryPrice} сом</Text>
          </Flex>
        </Flex>

        {paymentMethod === "cash" && (
          <Flex>
            <FormInput
              type={"number"}
              title={"С какой суммы подготовить сдачу?"}
              title_en={"Өзгөртүүнү канчага даярдашым керек?"}
              value={change}
              setValue={setChange}
            />
          </Flex>
        )}

        <Flex mt={{ base: "8px", lg: "20px" }}>
          <FormInput
            type={"text"}
            title={"Комментарии к заказу?"}
            title_en={"Буйрутма боюнча комментарийлер?"}
            value={comment}
            setValue={setComment}
          />
        </Flex>
        <Tooltip
          hasArrow
          label=""
          isDisabled={getTotalPrice() >= 1000}
          bg="red.600"
        >
          <Box
            position={{ base: "sticky", lg: "relative" }}
            bottom={{ base: "20px", lg: "unset" }}
            mx={"auto"}
            maxW={"350px"}
            width={"100%"}
            mt={{ base: "16px", lg: "55px" }}
          >
            <CustomButton
              isDisabled={cart.length === 0 || getTotalPrice() < 1000}
              isRequesting={isOrdering}
              text={t('confirm')}
              fn={createOrder}
            />
          </Box>
        </Tooltip>
      </Flex>

      <DeliveryMethod
        selectedAdressId={selectedAdressId}
        handleAdressSelect={handleAdressSelect}
        isOpen={isOpen}
        onClose={onClose}
        setDeliveryMethod={setDeliveryMethod}
        deliveryMethod={deliveryMethod}
        restaurants={branches}
        setSelectedRestaurant={setSelectedRestaurant}
        selectedRestaurant={selectedRestaurant}
      />
      <OrderSuccess showModal={orderSuccess} setShowModal={setOrderSuccess} />
    </Flex>
  );
};

export default Checkout;
