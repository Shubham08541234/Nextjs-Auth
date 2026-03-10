import { NextRequest, NextResponse } from "next/server";
import connectToDb from "@/DbConfig/dbConnect";

import { User } from "@/models/userModel";
import getData from "@/helpers/getDataFromToken";

connectToDb();

export async function GET(request: NextRequest){
    try {
        const userId = await getData(request.cookies.get("token")?.value);

        const user = await User.findOne({ _id: userId}).select("-password");


        return NextResponse.json({message: "user found" , data: user}, {status: 200});
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 400})
    }
}