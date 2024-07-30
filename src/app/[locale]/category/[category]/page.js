import { ENDPOINTS } from '@/api/endpoints'
import Bread from '@/components/BreadCrumbs/Bread'
import ProductList from '@/components/ui/ProductList'
import { Container, Flex, Heading } from '@chakra-ui/react'
import React from 'react'

const headingStyles = {
  fontFamily: "roboto",
  fontWeight: "700",
  fontSize: { base: "22px", lg: "36px" },
  textAlign: "center",
  color: "main",
  marginBottom:{base:'20px',lg:'40px'},
  my: { base: "12px", lg: "16px" },
}

const getProducts = async(params) =>{
  const data = await fetch(`${ENDPOINTS.getCategoryData(params.category)}`, {
    cache: 'no-store',
    headers:{
      'Accept-Language': `${params.locale}`,
    }
  })
  const products = await data.json()
  return products
}

const page = async({ params }) => {
  const products = await getProducts(params)

  return (
    <Container maxW={{ base: 'container.xl', xl: '1296px' }} pt={{ base: '22px', lg: '38px' }} px={{ base: '20px', xl: '0px' }}>

      <Heading {...headingStyles}>{params.category}</Heading>

      <ProductList products={products} />

    </Container>
  )
}

export default page