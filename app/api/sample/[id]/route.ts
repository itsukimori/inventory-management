import {  NextRequest, NextResponse } from "next/server";

const GET = (req: NextRequest, param: {params: { id: string }}) => {
    return NextResponse.json({
        message: `Hello ${param.params.id}`
    })
}

export { GET }