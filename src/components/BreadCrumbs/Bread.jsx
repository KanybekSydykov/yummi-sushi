'use client'
import React from 'react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container } from '@chakra-ui/react'

const Bread = () => {
  return (

    <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
    <BreadcrumbItem>
      <BreadcrumbLink href='#'>Home</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem>
      <BreadcrumbLink href='#'>About</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem isCurrentPage>
      <BreadcrumbLink href='#'>Contact</BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
  )
}

export default Bread