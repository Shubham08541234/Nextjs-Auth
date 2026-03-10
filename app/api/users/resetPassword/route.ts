import sendMail from "@/helpers/mailer";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        
        const {newPassword, token} = reqBody;

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});

        if(!user){
            return NextResponse.json({message: "User Not Found!"}, {status: 400});
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedNewPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry= undefined;

        await user.save();

        return NextResponse.json({message: "Password Reset Successfully", success: true}, {status: 200});


    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}