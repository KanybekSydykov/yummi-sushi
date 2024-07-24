"use client";
import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
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
import { useRouter } from "next/navigation";

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
  return `${item.city}, ул. ${item.street} , кв. ${item.house_number} ${
    item.entrance ? `, подъезд ${item.entrance}` : ""
  } ${item.flooer ? `, этаж ${item.floor}` : ""} ${
    item.intercom ? `, домофон ${item.intercom}` : ""
  } `;
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
  } = useCart();
  const [selectedAdressId, setSelectedAdressId] = useState(
    defaultAddress ? defaultAddress.id : null
  );
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
    const products = cart.map((item) => {
      return {
        product_size_id: item.selectedSize.id,
        quantity: item.quantity,
        topping_ids: item.addons.map((addon) => addon.id),
        is_bonus: false,
      };
    });
    const is_pickup = deliveryMethod === "Самовывоз";
    const restaurant_id = selectedRestaurant.id;
    const body = {
      products,
      is_pickup,
      delivery:{
        user_address_id: selectedAdressId,
      },
      restaurant_id,
      change,
      comment,
      payment_method: paymentMethod,
      order_source: "web"
    };

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
      console.log(data);
      toast({
        title: "Заказ успешно создан",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setChange(0);
      setComment(" ");
      clearCart();
      router.push(`/`);

    }
  }
  return (
    <Flex
      position={"relative"}
      flexDir={{ base: "column", lg: "row" }}
      flexWrap={"wrap"}
      mt={"60px"}
      mb={"100px"}
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
      >
        <Text
          textAlign={"center"}
          fontWeight={"700"}
          fontSize={"22px"}
          color={"#000"}
        >
          Состав заказа
        </Text>

     {cart.length > 0 ?   <Flex flexDir={"column"} gap={"30px"} mt={"30px"}>
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
        
        :
        <Text textAlign={"center"} mt={"30px"} color={"#000"} fontFamily={"roboto"} fontSize={"18px"} flexGrow={1}>
          Корзина пуста
        </Text>
        }


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
        <Text
          textAlign={"center"}
          fontFamily={"roboto"}
          fontWeight={"700"}
          fontSize={"22px"}
          color={"#000"}
        >
          Заказ на {deliveryMethod}
        </Text>

        <Flex
          flexDir={{ base: "column", lg: "row" }}
          gap={{ base: "20px", lg: "40px" }}
          mt={"20px"}
        >
          <Text
            width={{ base: "100%", lg: "140px" }}
            flexShrink={0}
            fontSize={"18px"}
            fontWeight={"700"}
          >
            Адрес {deliveryMethod === "Самовывоз" ? "пицерии" : "доставки"}
          </Text>
          <Flex
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
                  <Text fontFamily={"roboto"} fontSize={'16px'} fontWeight={"400"} width={"75%"}>{getAdressString(selectedAdress)}</Text>
                ) : <Text fontFamily={"roboto"} fontSize={'16px'} fontWeight={"400"} width={"75%"} cursor={"pointer"} onClick={() => openDeliveryModal(true)}>
                  Добавьте адрес для доставки
                  </Text>}
              </>
            ) : (
              <>{selectedRestaurant.address}</>
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
              Изменить
            </Text>

            <Text
              onClick={() => openDeliveryModal(false)}
              w={"100%"}
              textAlign={"right"}
              color={"main"}
              fontSize={"14px"}
              fontWeight={"600"}
              cursor={"pointer"}
            >
              Выбрать{" "}
              <span style={{ textTransform: "lowercase" }}>
                {deliveryMethod !== "Доставку" ? "Доставку" : "Самовывоз"}
              </span>
            </Text>
          </Flex>
        </Flex>

        <Flex
          flexDir={{ base: "column", lg: "row" }}
          gap={{ base: "20px", lg: "40px" }}
          mt={"20px"}
        >
          <Text
            width={{ base: "100%", lg: "140px" }}
            flexShrink={0}
            fontSize={"18px"}
            fontWeight={"700"}
          >
            Способ оплаты
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
                Наличными курьеру
              </Radio>
              <Radio size="md" value="card" colorScheme="orange">
                mBank перевод курьеру
              </Radio>
            </Stack>
          </RadioGroup>
        </Flex>

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

            <Text>{getTotalPrice()} сум</Text>
          </Flex>
          <Flex
            flexDir={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text>Начислим баллов</Text>

            <Text>+{countCashback(getTotalPrice())} </Text>
          </Flex>
          {deliveryMethod === "Доставку" ? (
            <Flex
              flexDir={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Text>Доставка</Text>
              <DeliveryPrice
                id={selectedAdressId}
                token={token}
                setDeliveryPrice={setDeliveryPrice}
              />
            </Flex>
          ) : null}
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
            <Text>Сумма заказа</Text>

            <Text>{+getTotalPrice() + deliveryPrice} сом</Text>
          </Flex>
        </Flex>

        {paymentMethod === "cash" && (
          <Flex>
            <FormInput
              type={"number"}
              title={"С какой суммы подготовить сдачу?"}
              title_en={"How much do you want to give as change?"}
              value={change}
              setValue={setChange}
            />
          </Flex>
        )}

        <Flex mt={"20px"}>
          <FormInput
            type={"text"}
            title={"Комментарии к заказу?"}
            title_en={"Order comments?"}
            value={comment}
            setValue={setComment}
          />
        </Flex>

        <Box mx={"auto"} maxW={"350px"} width={"100%"} mt={"55px"}>
          <CustomButton text={"Подтвердить заказ"} fn={createOrder} />
        </Box>
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
      />
    </Flex>
  );
};

export default Checkout;
