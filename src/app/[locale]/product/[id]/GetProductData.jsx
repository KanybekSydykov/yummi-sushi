import React from 'react'
import { Box } from '@chakra-ui/react'
import ProductInfo from '@/components/ui/ProductInfo'

export async function generateMetadata({ params, searchParams }, parent) {
  // optionally access and extend (rather than replace) parent metadata
  const data = await getProductData(params.locale)
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: data[0].name,
    description: data[0].description,
    openGraph: {
      description: data[0].description,
      title: data[0].name,
      images: [{ url: data[0].photo }, ...previousImages],
    },
  }
}


async function getProductData(params) {
  try {
    const res = await fetch(`https://food.tatadev.pro/api/v1/products/product/search/?id=${params.id}`,{
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': `${params.locale}`,
      },
    })
    const data = await res.json()

    if(res.ok){
        return data
    }
  } catch (error) { 
    throw new Error(error)
    
  }
}

const GetProductData = async({params}) => {
  const data = await getProductData(params)
  return (
    <Box>
    <ProductInfo fetchedProduct={data[0]} />
    </Box>
  )
}

export default GetProductData