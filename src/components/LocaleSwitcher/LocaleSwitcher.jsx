'use client'
import { usePathname, useRouter } from '@/lib/navigation';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation'
import React from 'react'

const LocaleSwitcher = ({inMenu=false}) => {
    const router = useRouter();
    const pathName = usePathname();
    const {locale} = useParams();

    function switchLocale(lang) {
      router.push(pathName, { locale: lang });
    }

    const buttonStyles = {
        fontFamily:'roboto',
        fontWeight:'300',
        fontSize:'16px',
        color:inMenu ? "lightgray":'fontgray',
        outline:'none',
        bg:'transparent',
        border:'none',
        padding:'0px',
        margin:'0px',
        minW:'unset',
        minH:'unset',
        borderRadius:'0px',
        h:'auto',
        transition:'all 0.3s ease',
        _hover:{
            bg:'transparent',
            borderBottom:'1px solid red'
        },
        _disabled:{
            color:'main',
            fontWeight:'700'
        }
    }

  return (
   <Flex flexDir={'row'} alignItems={'center'} gap={'2.5px'}
   >
    <Button onClick={() => switchLocale('ru')}  {...buttonStyles} isDisabled={locale === 'ru'} 
>
        РУ
    </Button>
    <Box w={'1.5px'} h={'12px'} bg={inMenu ? "lightgray":'black'}>
    </Box>
    <Button fontWeight={'inherit'} onClick={() => switchLocale('ky')} {...buttonStyles} isDisabled={locale === 'ky'}>
        КГ
    </Button>
   </Flex>
  )
}

export default LocaleSwitcher