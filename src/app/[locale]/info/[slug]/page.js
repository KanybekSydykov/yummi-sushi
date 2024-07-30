import { ENDPOINTS } from '@/api/endpoints'
import React from 'react'
import Info from './Info'
import { Container } from '@chakra-ui/react'

async function getInfo(slug, locale) {
  try {
    const res = await fetch(`${ENDPOINTS.getStaticPageInfo(slug)}`, {
      cache: 'no-store',
      headers: {
        'Accept-Language': `${locale}`,
      }
    })
    const data = await res.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}

const page = async ({ params }) => {
  const data = await getInfo(params.slug, params.locale)
  return (
    <Container maxW={{ base: 'container.xl', xl: '1296px' }} p={{ base: '20px', xl: '0px' }}>

      <Info data={data} />
    </Container>
  )
}

export default page