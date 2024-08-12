import { ENDPOINTS } from '@/api/endpoints';
import Checkout from '@/components/Checkout/Checkout';
import { getSession } from '@/lib/auth';
import { Container } from '@chakra-ui/react';
import { redirect } from 'next/navigation';

async function getUserAddresses(token) {
    try {
        const res = await fetch(`${ENDPOINTS.getUserAdress()}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const data = await res.json()
        if (res.ok) {
            return data
        }
    } catch (error) {
        throw new Error(error)
    }
}

async function getRestaurantAdresses() {
    try {
        const res = await fetch(`${ENDPOINTS.getRestaurantAdresses()}`)
        const data = await res.json()
        if (res.ok) {
            return data
        }
    } catch (error) {
        throw new Error(error)
    }
}

const page = async () => {

    const session = await getSession()

    const access_token = session?.access_token

    if(!session){
        redirect('/');
    }

    const addresses = await getUserAddresses(access_token);

    function getPrimaryAdress(arr) {
        if(!arr){
            return []
        }
        const defaultAddress = arr.filter((address) => address.is_primary === true);
        return defaultAddress;
    }

    const defaultAddress = getPrimaryAdress(addresses)
    const restaurants = await getRestaurantAdresses();

    return (
        <Container maxW={{ base: 'container.xl', xl: '1296px' }} pt={{base:'0px',lg:'50px'}} px={{ base: '20px', xl: '0px' }}>

            <Checkout defaultAddress={defaultAddress.length ? defaultAddress[0] : null} token={access_token} branches={restaurants} />


        </Container>
    )
}

export default page