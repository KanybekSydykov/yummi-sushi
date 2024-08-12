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
        cache:'no-cache',
        headers:{
            'Accept-Language': `${params.locale}`,
            'Authorization': `Bearer ${token}`
        }
    })
    const profileInfo = await data.json()
    return profileInfo
}

const ProfilePageContent = async({ params }) => {
    const session = await getSession()

    const access_token = session?.access_token

    if(!session){
        redirect('/');
    }

    const data = await getUserProfileInfo(params,access_token)

    return (
        <Container maxW={{ base: 'container.xl', xl: '1296px' }} p={{ base: '20px', xl: '0px' }} py={{ xl: '50px' }} minH={'50dvh'} h={'auto'}>
            <Flex flexDir={'row'} gap={'50px'} mt={'50px'} position={"relative"} minH={{ base: '100dvh', lg: 'fit-content' }}>
                <ProfileNav />
                <ProfileInfo data={data} token={access_token}/>
                <Cashback token={access_token} />
                <MyOrders token={access_token} />
                <LogOut />

            </Flex>
        </Container>

    )
}

export default ProfilePageContent