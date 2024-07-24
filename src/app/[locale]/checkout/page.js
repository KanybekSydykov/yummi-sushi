import { ENDPOINTS } from '@/api/endpoints';
import Bread from '@/components/BreadCrumbs/Bread'
import Checkout from '@/components/Checkout/Checkout';
import { getSession } from '@/lib/auth';
import { Container } from '@chakra-ui/react';
import { redirect } from 'next/navigation';

import React from 'react'

const labelStyles = {
    fontWeight: "400",
    fontSize: "16px",
    color: "#666666",
};

const inputStyles = {
    border: "1px solid #A0A0A0",
    borderRadius: "10px",
    _focus: {
        borderColor: "#FF8341",
        boxShadow: "0px 0px 0px 1px #FF8341",
    },
    _hover: {
        borderColor: "#FF8341",
    }
};

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

    const access_token = session?.user?.access_token

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
    console.log(restaurants);
    return (
        <Container maxW={{ base: 'container.xl', xl: '1296px' }} pt={'50px'} px={{ base: '20px', xl: '0px' }}>

            <Checkout defaultAddress={defaultAddress.length ? defaultAddress[0] : null} token={access_token} branches={restaurants} />


        </Container>
    )
}

export default page