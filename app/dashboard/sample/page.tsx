import MainLayout from "@/app/components/layouts/main-layout";
import { withAuth } from "@/app/components/hoc/withAuth";

type DecodedValue = {
    name?: string;
    email?: string;
}

function Sample({ session, decodedValue }: { session: any, decodedValue: DecodedValue | null }) {
    return (
        <MainLayout>
            <h1>Sample</h1>
        </MainLayout>
    );
}

export default withAuth(Sample);