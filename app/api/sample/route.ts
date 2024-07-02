import { NextResponse } from "next/server"

const GET = () => {
    return NextResponse.json( { seikou: "!"} )
}

export { GET }