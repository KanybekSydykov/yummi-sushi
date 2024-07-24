import { ENDPOINTS } from '@/api/endpoints'
import Bread from '@/components/BreadCrumbs/Bread'
import Cashback from '@/components/Profile/Cashback'
import LogOut from '@/components/Profile/LogOut'
import MyOrders from '@/components/Profile/MyOrders'
import ProfileInfo from '@/components/Profile/ProfileInfo'
import ProfileNav from '@/components/Profile/ProfileNav'
import { getSession } from '@/lib/auth'
import { Container, Flex } from '@chakra-ui/react'
import { redirect } from 'next/navigation'
import React from 'react'

const getUserProfileInfo = async(params,token) =>{

    const data = await fetch(`${ENDPOINTS.getUserProfileInfo()}`, {
        headers:{
            'Accept-Language': `${params.locale}`,
            'Authorization': `Bearer ${token}`
        }
    })
    const profileInfo = await data.json()
    return profileInfo
}

const page = async({ params }) => {
    const session = await getSession()

    const access_token = session?.user?.access_token

    if(!session){
        redirect('/');
    }

    const data = await getUserProfileInfo(params,access_token)

    console.log(data);

    return (
        <Container maxW={{ base: 'container.xl', xl: '1296px' }} p={{ base: '20px', xl: '0px' }} pt={{ xl: '50px' }} minH={'100dvh'} h={'auto'}>
            <Bread />
            <Flex flexDir={'row'} gap={'50px'} mt={'50px'} position={"relative"} minH={{ base: '100dvh', lg: 'auto' }}>
                <ProfileNav />
                <ProfileInfo data={data} token={access_token}/>
                <Cashback />
                <MyOrders />
                <LogOut />

            </Flex>
        </Container>

    )
}

export default page