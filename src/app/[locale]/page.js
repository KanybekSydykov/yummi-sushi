import { ENDPOINTS } from '@/api/endpoints';
import BannersCover from '@/components/Banners/BannersCover';
import BannerSkeleton from '@/components/Banners/BannerSkeleton';
import HomeInfo from '@/components/HomeInfo/HomeInfo';
import { Container, Flex } from '@chakra-ui/react';
import { Suspense } from 'react';
import GetCategoryData from './category/[category]/GetCategoryData';
import CategoryPageSkeleton from '@/components/Skeleton/CategoryPageSkeleton';
import CategoriesNavbarSkeleton from '@/components/Categories/CategoriesNavbarSkeleton';
import CategoriesNavbar from '@/components/Categories/CategoriesNavbar';
import '../globals.css';
import CashbackHandler from '@/components/Bonus/CashbackHandler';
import ScrollSpyWrapper from '@/components/ui/ScrollSpyWrapper';
import HomeInfoSkeleton from '@/components/Skeleton/HomeInfoSkeleton';



async function getCategories(locale) {
  try {
    const res = await fetch(`${ENDPOINTS.getCategories()}`, {
      cache: "no-store",
      headers: {
        "Accept-Language": `${locale}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}


const getHomepageData = async (locale) => {
  try {
    const res = await fetch(`${ENDPOINTS.getHomepage()}`, {
      cache: 'no-store',
      headers: {
        "Accept-Language": `${locale}`,
      }
    })
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await res.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export async function generateMetadata({ params, searchParams }, parent) {
  // optionally access and extend (rather than replace) parent metadata
  const { main_page } = await getHomepageData(params.locale)
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: main_page.meta_title,
    description: main_page.meta_description,
    openGraph: {
      description: main_page.meta_description,
      title: main_page.meta_title,
      images: [{ url: main_page.meta_image }, ...previousImages],
    },
  }
}
export default async function HomePage({ params }) {

  const data = await getCategories(params.locale);

  return <main>


    <Suspense fallback={<CategoriesNavbarSkeleton />}>
      <CategoriesNavbar locale={params.locale} onMainPage={true} />
    </Suspense>
    <Container maxW={{ base: 'container.xl', xl: '1296px' }} p={{ base: '16px', '2xl': '0px' }}>

      <Suspense fallback={<BannerSkeleton />}>
        <BannersCover />
      </Suspense>

      {/* <Suspense fallback={<CategoriesSkeleton />}>
        <Categories locale={params.locale} />
      </Suspense> */}
      <Flex flexDir={'column'} mt={{ base: '0px', lg: '0px' }}>

        <ScrollSpyWrapper>

          {data?.map((category,index) => (
            <Suspense key={category.slug} fallback={<CategoryPageSkeleton />}>
              <GetCategoryData start={true} params={{ locale: params.locale, category: category.slug }} isFirstCategory={index === 0} />

            </Suspense>
          ))}
        </ScrollSpyWrapper>

      </Flex>



    </Container>

<Suspense fallback={<HomeInfoSkeleton /> }>
    <HomeInfo params={params}   />
</Suspense>
  </main>;
}