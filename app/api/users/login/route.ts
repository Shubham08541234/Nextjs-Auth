import connectToDb from "@/DbConfig/dbConnect";
import { User } from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

connectToDb();

export async function POST(request: NextRequest){
    try {
        const { email, password } = await request.json();
        console.log("reqBody: ", email, password);

        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 400});
        }

        const comPass = await bcrypt.compare(password, user.password);
        console.log("compared password: ", comPass);
        if(!comPass){
            return NextResponse.json({error: "Password is incorrect"}, {status: 400});
        }


        // create session token data to send as cookie
        
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        const response = NextResponse.json({
            message: "Login Successfull",
            success: true,
        }, {status: 200});

        response.cookies.set("token", token, {httpOnly: true});

        return response;
    } catch (error: any) {
        return NextResponse.json({
            error: error.message},
        {status: 500})
    }
}