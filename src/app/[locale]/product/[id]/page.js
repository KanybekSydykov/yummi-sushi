import CategoriesNavbarSkeleton from '@/components/Categories/CategoriesNavbarSkeleton'
import { Container } from '@chakra-ui/react'
import React, { Suspense } from 'react'
import GetProductData from './GetProductData'
import CategoriesNavbar from '@/components/Categories/CategoriesNavbar'

const page = ({ params }) => {
  return (
    <>
      <Suspense fallback={<CategoriesNavbarSkeleton />}>
        <CategoriesNavbar locale={params.locale} />
      </Suspense>
      <Container maxW={{ base: 'container.xl', xl: '1296px' }} pt={{ base: '22px', lg: '38px' }} px={{ base: '20px', xl: '0px' }}>
        <Suspense fallback={"loading..."}>
          <GetProductData params={params} />
        </Suspense>
      </Container>
    </>

  )
}

export default page