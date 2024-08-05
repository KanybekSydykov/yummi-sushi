import React from 'react'
import ProductInfo from '../../@modal/(.)product/[id]/ProductInfo'
import { Box } from '@chakra-ui/react'

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
    console.log(error);
    throw new Error(error)
    
  }
}

const GetProductData = async({params}) => {

  const data = await getProductData(params)
  console.log(data);
  return (
    <Box pb={'75px'}>
    <ProductInfo fetchedProduct={data[0]} />
    </Box>
  )
}

export default GetProductData