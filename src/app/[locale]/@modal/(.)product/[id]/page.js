
import React, { Suspense } from 'react'
import ProductModal from './ProductModal'
import ProductInfo from './ProductInfo'
import GetProductData from '@/app/[locale]/product/[id]/GetProductData'
import ProductInfoSkeleton from '@/components/Skeleton/ProductInfoSkeleton'

const page = ({ params }) => {
  return (
    <ProductModal>
      <Suspense fallback={<ProductInfoSkeleton />}>
        <GetProductData params={params} />
      </Suspense>
    </ProductModal>
  )
}

export default page