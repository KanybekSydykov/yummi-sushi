
import React from 'react'
import ProductModal from './ProductModal'
import ProductInfo from './ProductInfo'
import GetProductData from '@/app/[locale]/product/[id]/GetProductData'

const page = ({ params }) => {
   return (
    <ProductModal>
        <GetProductData params={params} />
    </ProductModal>
  )
}

export default page