import sendMail from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();

        const { email } = reqBody;

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({message: "User doesn't exist!"}, {status: 400});
        }

        const nodemailerRes = await sendMail({email, emailType: "RESET", userId: user._id})

        return NextResponse.json({
            message: "A mail is sent to your registered email",
            success: true,
        },{ status: 200});

    } catch (error: any) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 400
            }
        )
    }
}