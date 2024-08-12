import { Suspense } from "react";
import BonusPageContent from "./BonusPageContent";
import BonusPageSkeleton from "@/components/Skeleton/BonusPageSkeleton";

const page = () => {

  return (
    <Suspense fallback={<BonusPageSkeleton />}>
      <BonusPageContent />
    </Suspense>
  );
};

export default page;
