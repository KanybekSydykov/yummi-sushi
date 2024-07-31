import { ENDPOINTS } from '@/api/endpoints'
import ProductList from '@/components/ui/ProductList'
import { Heading } from '@chakra-ui/react'
import React from 'react'

const headingStyles = {
    fontFamily: "roboto",
    fontWeight: "700",
    fontSize: { base: "22px", lg: "36px" },
    textAlign: "center",
    color: "main",
    marginBottom: { base: '20px', lg: '40px' },
    my: { base: "12px", lg: "16px" },
  }

const getProducts = async (params) => {
    const data = await fetch(`${ENDPOINTS.getCategoryData(params.category)}`, {
      cache: 'no-store',
      headers: {
        'Accept-Language': `${params.locale}`,
      }
    })
    const products = await data.json()
    return products
  }

const GetCategoryData = async({params}) => {
    const products = await getProducts(params)
    console.log(products);
  return (
    <>
      <Heading {...headingStyles}>{products?.products[0].category_name}</Heading>

      <ProductList products={products ? products : null} />
    
    </>
  )
}

export default GetCategoryData