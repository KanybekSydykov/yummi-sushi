import CategoriesNavbar from '@/components/Categories/CategoriesNavbar'
import CategoriesNavbarSkeleton from '@/components/Categories/CategoriesNavbarSkeleton'
import React, { Suspense } from 'react'

const template = ({children}) => {
    return (
        <>
        <Suspense fallback={<CategoriesNavbarSkeleton />}>

            <CategoriesNavbar />
        </Suspense>
        {children}
        </>
    )
}

export default template