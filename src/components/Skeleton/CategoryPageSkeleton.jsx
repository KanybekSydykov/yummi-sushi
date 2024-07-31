import { Flex } from '@chakra-ui/react'
import React from 'react'
import ProductCardSkeleton from './ProductCartSkeleton'

const CategoryPageSkeleton = () => {
  return (
    <Flex flexDir={'row'} flexWrap={'wrap'} gap={'40px'} mt={'100px'}>
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
    </Flex>
  )
}

export default CategoryPageSkeleton