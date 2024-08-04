'use client'

import { useEffect } from "react";

const CashbackHandler = ({ value }) => {
    useEffect(() => {
        const cashbackValue = sessionStorage.getItem("cashback");
        if (!cashbackValue) {
            sessionStorage.setItem("cashback", JSON.stringify(value));
        }
    
    },[value])
 


  return null;
};

export default CashbackHandler;
