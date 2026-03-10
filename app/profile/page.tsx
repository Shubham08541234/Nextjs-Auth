"use client"

import Link from "next/link"
import axios from 'axios';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserProfile() {

    const [username, setUsername] = useState("");

    const router = useRouter();

    

    useEffect( () => {
        async function getDetails(){
            try {
                const response: any = await axios.get('/api/users/me');
                console.log("data: ", response);
                setUsername(response.data.data.username);
                
            } catch (error) {
                console.log("Error while fetching user: ", error);
            }
        }

        getDetails();
    }, [])

    const logout = async () => {
        try {
            const res = await axios.get('/api/users/logout');
            console.log("res: ", res);
            if(res.status == 200){
                router.push('/login');
            }else throw new Error("Error in logging Out");
        } catch (error: any) {
            console.log("Error: ", error);
            toast.error(error.message);
        }
    }
    return (
        <div className="py-2 min-h-screen flex justify-center items-center gap-2">
            <div>
                <h1>Profile</h1>
                <hr />
                <p className="text-4xl"> Profile page</p>
                <Link href='/profile/abc'>Enter params</Link>
            </div>

            <button onClick={logout} className="hover:bg-gray-500/50 px-3 py-1 rounded-lg cursor-pointer bg-blue-500">Logout</button>

            <div>
                <h1><b className="text-green-500">{username}</b> the user</h1>
            </div>
        </div>
    )
}