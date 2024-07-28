import { ENDPOINTS } from "@/api/endpoints"
import BannerSlider from "./Banners"
import { AspectRatio } from "@chakra-ui/react"

async function getBanners() {
    try {
        const res = await fetch(`${ENDPOINTS.getBanners()}`)
        const data = await res.json()
        return data
    } catch (error) {
        throw new Error(error)
    }
}

const BannersCover = async() => {
    const banners = await getBanners()

  return (
    <AspectRatio w={"100%"} ratio={{ base: 358 / 520, lg: 1296 / 400 }} h={{ base: '220px', lg: '440px' }} mt={{ base: '40px', lg: '70px' }}>
        <BannerSlider banners={banners} />
    </AspectRatio>
  )
}

export default BannersCover