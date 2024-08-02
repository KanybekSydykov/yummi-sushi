'use client'
const CashbackHandler = ({ value }) => {
    const cashbackValue = sessionStorage.getItem("cashback");
    if (!cashbackValue) {
        sessionStorage.setItem("cashback", JSON.stringify(value));
    }



  return null;
};

export default CashbackHandler;
