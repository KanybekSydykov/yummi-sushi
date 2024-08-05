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
    <AspectRatio w={"100%"} ratio={{ base: 364 / 350, lg: 1296 / 400 }} maxH={{ base: '360px', lg: '440px' }} mt={{ base: '0px', lg: '30px' }}>
        <BannerSlider banners={banners} />
    </AspectRatio>
  )
}

export default BannersCover