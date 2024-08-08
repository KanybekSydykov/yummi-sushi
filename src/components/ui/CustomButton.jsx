'use client'
import { Button, Text, transition } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import React from 'react'


const buttonStyles = {
    border: "1px solid #DD5209",
    borderRadius: "30px",
    background: "linear-gradient(304deg, rgba(255, 131, 65, 1) 0%, rgba(255, 131, 65, 1) 100%)",
    color: "white",
    fontFamily: "roboto",
    fontWeight: "400",
    fontSize: "20px",
    width: "100%",
    height:'45px',
    outline: "none",
    maxW :'420px',
    _hover: {
      background: "linear-gradient(304deg, rgba(255, 131, 65, 1) 0%, rgba(255, 213, 65, 1) 100%)",
      "@media screen and (min-width: 992px)": {
        transform: "scale3d(1.05, 1.05, 1.05) translateY(-1px)",

      },
    },
    _groupHover:{
      background: "linear-gradient(304deg, rgba(255, 131, 65, 1) 0%, rgba(255, 213, 65, 1) 100%)",
      "@media screen and (min-width: 992px)": {
        transform: "scale3d(1.05, 1.05, 1.05) translateY(-1px)",
      },
    },
    _focus: {
      background: "linear-gradient(304deg, rgba(255, 131, 65, 1) 0%, rgba(255, 213, 65, 1) 100%)",
    },
    transition: "all .15s linear",
  };


const CustomButton = ({fn = () => null,text,isDisabled,isRequesting,...props}) => {
  const t=useTranslations("Common")
  return (
    <Button onClick={fn} {...buttonStyles}
    isDisabled={isDisabled}
    isLoading={isRequesting}
    loadingText={t('sending')}
    {...props}
    >
    <Text>{text}</Text>
  </Button>
  )
}

export default CustomButton