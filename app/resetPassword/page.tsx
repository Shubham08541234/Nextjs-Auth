"use client"

import { useEffect, useState } from "react";
import axios from "axios";
// import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPassword() {

    // const searchParams = useSearchParams();
    // const token = searchParams.get("token");

    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const getToken: any = params.get("token");
        if(getToken) setToken(getToken);
        console.log(token);
    }, [])
    
    console.log(token);
    const resetPassword = async (e: any) => {
        e.preventDefault();

        if(newPassword !== confirmNewPassword){
            setError("Passwords do not match");
            return;
        }

        try {

            setLoading(true);

            const res = await axios.post("/api/users/resetPassword", {
                token,
                newPassword
            });

            if(res.status === 200){
                setSuccess(true);
            }

        } catch (err: any) {

            setError(err.response?.data?.message || "Something went wrong");

        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="flex items-center justify-center min-h-screen bg-black">

            <form
                onSubmit={resetPassword}
                className="flex flex-col gap-4 bg-black p-8 rounded-2xl shadow-lg w-full max-w-md"
            >

                <h2 className="text-2xl font-semibold text-center text-white">
                    Reset Password
                </h2>

                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    {loading ? "Processing..." : "Reset Password"}
                </button>

                {success && (
                    <div className="text-center mt-2">
                        <p className="text-green-600">Password reset successful</p>
                        <Link href="/login" className="text-blue-600 underline">
                            Go to Login
                        </Link>
                    </div>
                )}

            </form>

        </div>
    );
}