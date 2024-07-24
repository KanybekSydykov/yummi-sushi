import { Button, Text } from '@chakra-ui/react';
import React from 'react'


const buttonStyles = {
    border: "1px solid #DD5209",
    borderRadius: "30px",
    bg: "main",
    color: "white",
    fontFamily: "roboto",
    fontWeight: "400",
    fontSize: "20px",
    width: "100%",
    height:'45px',
    outline: "none",
    _hover: {
      bg: "#DD5209",
    },
    _focus: {
      bg: "#DD5209",
    },
  };


const CustomButton = ({fn,text,isDisabled,isRequesting}) => {
  return (
    <Button onClick={fn} {...buttonStyles}
    isDisabled={isDisabled}
    isLoading={isRequesting}
    loadingText="Отправка..."
    >
    <Text>{text}</Text>
  </Button>
  )
}

export default CustomButton