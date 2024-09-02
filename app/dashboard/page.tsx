import { redirect } from "next/navigation";
import { getCookieValue } from "@/app/lib/session";
import jwt from 'jsonwebtoken';
import { auth } from "@/auth";
import MainLayout from "@/app/components/layouts/main-layout";
import { UserInfo } from "@/app/components/ui/user-info/UserInfo";
import { CardGradient } from "@/app/components/ui/card-gradient/CardGradient";
import { Flex, rem, Paper, Text } from "@mantine/core";
import { IconBuildingStore, IconBuildingWarehouse, IconDatabaseImport } from "@tabler/icons-react";
import { StoreProvisionHistoryTable } from "@/app/components/storeProvisionHistory/StoreProvisionHistoryTable";

type DecodedValue = {
    name?: string;
    email?: string;
}

export default async function Dashboard() {
    
    const cookieName = 'guest-session';
    const cookieValue = await getCookieValue(cookieName);
    const session = await auth();

    let decodedValue: DecodedValue | null = null;
    if(cookieValue) {
        const decoded = jwt.verify(cookieValue, process.env.AUTH_SECRET!) as DecodedValue;
        decodedValue = decoded;
    }

    //ubuntu side 
    if(!session && !cookieValue) {
        return redirect("/");
    }

    return (
        <MainLayout>
            {
                session ?
                <>
                    <UserInfo name={session.user?.name} email={session.user?.email} imageUrl={session.user?.image} />
                </>
                :
                <>
                    <UserInfo 
                        name={decodedValue?.name}
                        email={decodedValue?.email}
                        imageUrl={"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"}
                    />
                </>
            }
            <Flex
                direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}
                justify="wrap"
                wrap="wrap"
                mt='lg'
            >
                <a href="/dashboard/create-product">
                    <CardGradient 
                        title="製品を倉庫に供給"
                        description="製品を倉庫に供給するには新規作成ボタンを押下してください。"
                        icon={<IconBuildingWarehouse style={{ width: rem(28), height: rem(28) }} stroke={1.5} />}
                        color1="pink"
                        color2="orange"
                        buttonText="新規作成"
                    />
                </a>
                <a href="/dashboard/create-order">
                    <CardGradient 
                        title="店舗に製品を提供"
                        description="店舗に製品を提供するには店舗供給ボタンを押下してください。"
                        icon={<IconBuildingStore style={{ width: rem(28), height: rem(28) }} stroke={1.5} />}
                        color1="blue"
                        color2="green"
                        buttonText="店舗提供"
                    />
                </a>
                <a href="/dashboard/inventory">
                    <CardGradient 
                        title="在庫一覧を表示"
                        description="在庫一覧を確認するには在庫一覧ボタンを押下してください。"
                        icon={<IconDatabaseImport style={{ width: rem(28), height: rem(28) }} stroke={1.5} />}
                        color1="#53ded6"
                        color2="#148ECC"
                        buttonText="在庫一覧"
                    />
                </a>
            </Flex>
            <Paper withBorder shadow="xl" radius="sm" mt="xl">
                <Text m="md">店舗提供履歴</Text>
                <StoreProvisionHistoryTable />
            </Paper>
        </MainLayout>
    );
}
