import { ENDPOINTS } from '@/api/endpoints';
import BannerSlider from '@/components/Banners/Banners';
import BannersCover from '@/components/Banners/BannersCover';
import BannerSkeleton from '@/components/Banners/BannerSkeleton';
import Categories from '@/components/Categories/Categories';
import HomeInfo from '@/components/HomeInfo/HomeInfo';
import CategoriesSkeleton from '@/components/Skeleton/CategoriesSkeleton';
import { AspectRatio, Container, Flex } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';

const getHomepageData = async(locale) => {

  try {
    const res = await fetch(`${ENDPOINTS.getHomepage()}`,{
      cache: 'no-store',
      headers: {
        "Accept-Language": `${locale}`,
      }
    })
    const data = await res.json()
  
    return data
  } catch (error) {
    throw new Error(error)
  }


}

export default async function HomePage({params}) {
  const data = await getHomepageData(params.locale)




  return <main>
    <Container maxW={{ base: 'container.xl', xl: '1296px' }} p={{ base: '20px', xl: '0px' }}>
  <Suspense fallback={<BannerSkeleton />}>

      <BannersCover />
  </Suspense>

<Suspense fallback={<CategoriesSkeleton />}>
      <Categories locale={params.locale} />
</Suspense>



    </Container>
      <HomeInfo info={{delivery:data.main_page.delivery_conditions, payment:data.main_page.methods_of_payment,order:data.main_page.order_types}} />
  </main>;
}