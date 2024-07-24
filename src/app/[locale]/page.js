import { ENDPOINTS } from '@/api/endpoints';
import BannerSlider from '@/components/Banners/Banners';
import BannersCover from '@/components/Banners/BannersCover';
import BannerSkeleton from '@/components/Banners/BannerSkeleton';
import Categories from '@/components/Categories/Categories';
import HomeInfo from '@/components/HomeInfo/HomeInfo';
import { AspectRatio, Container, Flex } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';

const getHomepageData = async() => {
  const res = await fetch(`${ENDPOINTS.getHomepage()}`)
  const data = await res.json()

  return data
}

export default async function HomePage() {
  const data = await getHomepageData()



  console.log(data);

  return <main>
    <Container maxW={{ base: 'container.xl', xl: '1296px' }} p={{ base: '20px', xl: '0px' }}>
      {/* <AspectRatio width={"100%"} ratio={{ base: 358 / 520, lg: 1296 / 400 }} maxH={{ base: '520px', lg: '400px' }} mt={{ base: '40px', lg: '70px' }}>
        <BannerSlider banners={data.banners} />
      </AspectRatio> */}
  <Suspense fallback={<BannerSkeleton />}>

      <BannersCover />
  </Suspense>

      <Categories categories={data.categories} />



    </Container>
      <HomeInfo info={{delivery:data.main_page.delivery_conditions, payment:data.main_page.methods_of_payment,order:data.main_page.order_types}} />
  </main>;
}