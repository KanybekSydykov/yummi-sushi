import CustomButton from '@/components/ui/CustomButton'
import { Container, Flex, Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const headingStyles = {
    fontFamily: "roboto",
    fontWeight: "700",
    fontSize: { base: "22px", lg: "36px" },
    textAlign: "left",
    color: "main",
    marginBottom: { base: '20px', lg: '40px' },
    my: { base: "12px", lg: "16px" },
  }

const page = () => {


  return (
    <Container maxW={{ base: 'container.xl', xl: '1296px' }} p={{ base: '20px', lg: '50px' }}>
    <Flex flexDir={'column'} gap={'32px'} width={'100%'} pb={'50px'}>

      <Heading {...headingStyles}>Страница не найдена</Heading>
      <Text fontFamily={"roboto"} fontWeight={"400"} fontSize={"18px"} color={"#000"}>
      Но не расстраивайтесь, мы все починим, а пока закажите себе вкусненького!
      </Text>
      <Link href={'/'} style={{maxWidth:'350px'}}>
  <CustomButton text={'Смотри что можно поесть'}  />
      </Link>

      <Image src={'/404.svg'} width={500} height={500} alt={'404'} style={{objectFit:'contain',margin:'0 auto'}} />
      </Flex>
      </Container>
  )
}

export default page