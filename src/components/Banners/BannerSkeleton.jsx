import { Skeleton } from '@chakra-ui/react'
import React from 'react'

const BannerSkeleton = () => {
  return (
    <Skeleton width={"100vw"} maxW={'container.xl'} h={{ base: '220px', lg: '400px' }} mt={{ base: '40px', lg: '70px' }} />
  )
}

export default BannerSkeleton