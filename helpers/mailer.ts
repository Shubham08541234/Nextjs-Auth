import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';

export default async function sendMail({email, emailType, userId}: any){
    try {
        const token = await bcrypt.hash(userId.toString(), 10);

        if(emailType === "VERIFY"){
            await User.findOneAndUpdate({_id: userId}, {verifyToken: token, verifyTokenExpiry: Date.now() + 360000});
        }

        if(emailType === "RESET"){
            await User.findOneAndUpdate({_id: userId}, { forgotPasswordToken: token, forgotPasswordTokenExpiry: Date.now() + 360000});
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "66adce4064f50f",
                pass: "da6b5362c38d89"
            }
        })

        const mailOptions = {
            from: "shubhamsingh0854@gmail.com",
            to: email,
            subject: emailType === "VERIFY"? 'Verify Your Email': "Reset Your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY"? "verifyEmail": "resetPassword"}?token=${token}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyEmail?token=${token}
            </p>`
        }

        return await transporter.sendMail(mailOptions);
    } catch (error: any) {
        throw new Error(error.message);
    }
}