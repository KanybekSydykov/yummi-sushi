import { Skeleton } from '@chakra-ui/react'
import React from 'react'

const BannerSkeleton = () => {
  return (
    <Skeleton width={"100%"} aspectRatio={3/2} h={{ base: '220px', lg: '400px' }} mt={{ base: '40px', lg: '70px' }}>
  </Skeleton>
  )
}

export default BannerSkeleton