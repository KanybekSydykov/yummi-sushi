import HomeInfoContent from "./HomeInfoContent";
import CashbackHandler from "../Bonus/CashbackHandler";
import { ENDPOINTS } from "@/api/endpoints";

const getHomepageData = async (locale) => {
  try {
    const res = await fetch(`${ENDPOINTS.getHomepage()}`, {
      cache: "no-store",
      headers: {
        "Accept-Language": `${locale}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const HomeInfo = async ({ params }) => {
  const data = await getHomepageData(params.locale);

  return (
    <>
      <HomeInfoContent
        info={{
          delivery: data.main_page.delivery_conditions,
          payment: data.main_page.methods_of_payment,
          order: data.main_page.order_types,
        }}
      />
      <CashbackHandler value={data.cash_back.web} />
    </>
  );
};

export default HomeInfo;
