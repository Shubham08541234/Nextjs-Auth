import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';

export default async function sendMail({email, emailType, userId}: any){
    try {
        const token = await bcrypt.hash(userId.toString(), 10);

        if(emailType === "VERIFY"){
            await User.findOneAndUpdate({_id: userId}, {verifyToken: token, verifyTokenExpiry: Date.now() + 3600000});
        }

        if(emailType === "RESET"){
            await User.findOneAndUpdate({_id: userId}, { forgotPasswordToken: token, forgotPasswordTokenExpiry: Date.now() + 3600000});
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILUSER!,
                pass: process.env.MAILPASS!
            }
        })

        const domain = process.env.DOMAIN;
        if(!domain){
            throw new Error("Domain name is not defined!");
        }

        const mailOptions = {
            from: "shubhamsingh0854@gmail.com",
            to: email,
            subject: emailType === "VERIFY"? 'Verify Your Email': "Reset Your Password",
            html: `<p>Click <a href="${domain}/${emailType === "VERIFY"? "verifyEmail": "resetPassword"}?token=${token}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${domain}/${emailType === "VERIFY"? "verifyEmail": "resetPassword"}?token=${token}
            </p>`
        }

        return await transporter.sendMail(mailOptions);
    } catch (error: any) {
        throw new Error(error.message);
    }
}