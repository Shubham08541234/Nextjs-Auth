import connectToDb from "@/DbConfig/dbConnect";
import { User } from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sendMail from "@/helpers/mailer";

connectToDb();


export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();

        const {username, email, password} = reqBody;

        console.log("reqBody: ", reqBody);

        // get user object from db
        const user = await User.findOne({email});

        console.log("user: ", user);

        if(user){
            return NextResponse.json({error: "User already exits", status: 400})
        }

        // hash the password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log("savedUser: ", savedUser);

        // send email
        const mailRes =  await sendMail({ email, emailType: "VERIFY", userId: savedUser._id});
        console.log("mailRes: ", mailRes);
        return NextResponse.json({
            message: `User ${username} created successfully`,
            success: true,
            savedUser
        }, { status: 201})


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

