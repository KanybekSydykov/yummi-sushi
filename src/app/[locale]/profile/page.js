import { Suspense } from "react"
import ProfilePageContent from "./ProfilePageContent"
import ProfilePageSkeleton from "@/components/Skeleton/ProfilePageSkeleton"

const page =({ params }) => {
    return (
        <Suspense fallback={<ProfilePageSkeleton />}>
            <ProfilePageContent params={params} />
        </Suspense>
    )
}

export default page