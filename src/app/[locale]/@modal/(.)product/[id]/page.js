
import React, { Suspense } from 'react'
import ProductModal from './ProductModal'
import ProductInfo from './ProductInfo'

const page = ({ params }) => {
  return (
    <ProductModal key={params.id}>
      <ProductInfo productId={params.id} />
    </ProductModal>
  )
}

export default page