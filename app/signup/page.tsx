"use client"

import Link from "next/link";
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


const SignupPage = () => {

  const [user, setUser] = useState({
        email: "",
        username: "",
        password: "",
    })

  const [ buttonDisabled, setButtonDisabled ] = useState(true);
  const [ mailMsg, setMailMsg ] = useState(null);

  const router = useRouter();

    useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
        setButtonDisabled(false);
      }
      else setButtonDisabled(true);
    },[user])

    const onSingup = async () => {
      try {
        const res = await axios.post('/api/users/signup', user);
        console.log("res: ", res);
        if(res.data.mailRes){
            setMailMsg(res.data.mailRes.accepted[0]);
        }
      } catch (error: any) {
        console.log("Signup failed! ", error.message)

        toast.error(error.message);
      }
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Signup</h1>
      <hr />
      <div className="mt-1">
        <label htmlFor="username">Username: </label>
        <input 
        className="
        bg-gray-500/50
        px-2 py-0.5
        rounded-sm
        border border-gray-600
        hover:border-white
        "
        type="text" 
        id="username" 
        value={user.username} 
        name="username" 
        onChange={(e) => setUser({...user, username: e.target.value})}
        placeholder="Enter the username"
        />
      </div>
      <div className="mt-1">
        <label htmlFor="email">Email: </label>
        <input 
        className="
        bg-gray-500/50
        px-2 py-0.5
        rounded-sm
        border border-gray-600
        hover:border-white
        "
        type="email" 
        id="email" 
        value={user.email} 
        name="email" 
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder="Enter the email"
        />
      </div>
      <div className="mt-1">
        <label htmlFor="password">Password: </label>
        <input 
        className="
        bg-gray-500/50
        px-2 py-0.5
        rounded-sm
        border border-gray-600
        hover:border-white
        "
        type="password" 
        id="password" 
        value={user.password} 
        name="password" 
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder="Enter the password"
        />
      </div>

      <button
      disabled={buttonDisabled}
      onClick={onSingup}
      className={`${buttonDisabled && "bg-gray-700" || "bg-red-500"} mt-1
      p-2 border border-gray-800
      rounded-lg mb-4 focus:outline-none
      hover:border-white
      focus:border-gray-600
      cursor-pointer
      `}>{buttonDisabled?"No Signup": "Signup"}</button>
      {
        mailMsg && (
          <div><p>A email verification link is sent to <span className="text-[16px] text-blue-300">{mailMsg}</span></p></div>
        )
      }
      <Link href="/login" className="text-blue-500">Go to Login</Link>
    </div>
  )
}

export default SignupPage
