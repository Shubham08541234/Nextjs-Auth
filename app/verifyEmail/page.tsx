"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import SuccessTick from "@/components/SuccessTick";
import { useRouter } from "next/navigation";

export default function VerifyEmail(){

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [ Loading, setLoading ] = useState(true);

    const router = useRouter();



    const verifyUserEmail = async () => {
        try {
            if(verified){
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
                return;
            }
            const res = await axios.post('/api/users/verifyEmail', { token });
            if(res.status === 200){
                setVerified(true);
            }
        } catch (error: any) {
            setError(true);
            console.log("Error:", error.message);
        }
    }

    // Extract token once
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if(token) setToken(token);
    }, []);

    // Verify when token available
    useEffect(() => {
        if(token.length > 0){
            setLoading(false);
            verifyUserEmail();
        }
    }, [token, verified]);

    return (
        
        <div>
            {
                Loading? <div className="flex flex-col items-center justify-center min-h-screen py-2">Loading...</div>:(
                    <div className="flex flex-col items-center justify-center min-h-screen py-2">
                        <h1 className="text-4xl">Verify Email</h1>
                        <h2 className="p-2 bg-orange-500 text-black">{token ? token : "No Token"}</h2>

                        {verified && (
                            <div>
                                <SuccessTick />
                            </div>
                        )}

                        {error && (
                            <div>
                                <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                            </div>
                        )}
                    </div>)
            }
        </div>
    );
}