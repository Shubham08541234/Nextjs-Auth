import connectToDb from "@/DbConfig/dbConnect";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectToDb();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const { token } = reqBody;

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});
        console.log("user: ", user);
        if(!user){
            return NextResponse.json({ message: "User not found or Invalid token"}, {status: 400});
        }
        if(user.isVerified){
            return NextResponse.json({message: "User is already verified"}, {status: 400});
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({ message: "user verified successfull", success: true}, {status: 200});

    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}