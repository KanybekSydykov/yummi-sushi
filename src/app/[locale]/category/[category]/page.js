import CategoriesNavbar from '@/components/Categories/CategoriesNavbar'
import CategoriesNavbarSkeleton from '@/components/Categories/CategoriesNavbarSkeleton'
import { Container, Flex, Heading } from '@chakra-ui/react'
import React, { Suspense } from 'react'
import GetCategoryData from './GetCategoryData'
import CategoryPageSkeleton from '@/components/Skeleton/CategoryPageSkeleton'





const page = ({ params }) => {

  return (
    <Container maxW={{ base: 'container.xl', xl: '1296px' }} pt={{ base: '22px', lg: '38px' }} px={{ base: '20px', xl: '0px' }}>
      <Suspense fallback={<CategoriesNavbarSkeleton />}>
        <CategoriesNavbar locale={params.locale} />
      </Suspense>

    <Suspense fallback={<CategoryPageSkeleton />}>
    <GetCategoryData params={params}  />
    </Suspense>
    </Container>
  )
}

export default page