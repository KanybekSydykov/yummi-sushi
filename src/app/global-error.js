'use client'
import CustomButton from "@/components/ui/CustomButton"
import { useRouter } from "@/lib/navigation"
import { AspectRatio, Box, Container, Flex, Heading, Text } from "@chakra-ui/react"
import Image from "next/image"
import { useEffect } from "react"


const headingStyles = {
  fontFamily: "roboto",
  fontWeight: "700",
  fontSize: { base: "22px", lg: "36px" },
  textAlign: "left",
  color: "main",
  marginBottom: { base: '20px', lg: '40px' },
  my: { base: "12px", lg: "16px" },
}

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  const router = useRouter()
  return (
    <html>
      <body>
        <Container maxW={{ base: 'container.xl', xl: '1296px' }} p={{ base: '20px', xl: '0px' }} pb={'50px'}>
          <Flex flexDir={'column'} gap={'32px'} width={'100%'}>

            <Heading {...headingStyles}>Страница не найдена</Heading>
            <Text fontFamily={"roboto"} fontWeight={"400"} fontSize={"18px"} color={"#000"}>
              Но не расстраивайтесь, мы все починим, а пока закажите себе вкусненького!
            </Text>
            <Box maxW={'350px'}>
              <CustomButton text={'Смотри что можно поесть'} fn={() => router.push('/')} />
            </Box>

            <Image src={'/404.svg'} width={500} height={500} alt={'404'} style={{ objectFit: 'contain', margin: '0 auto' }} />
          </Flex>
        </Container>
      </body>
    </html>
  )
}