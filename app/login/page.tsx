"use client"

import Link from "next/link"
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import axios from "axios"
import React from "react"
import toast from "react-hot-toast"


export default function LoginPage(){

  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const [ buttonDisabled, setButtonDisabled] = useState(false);
  
  const router = useRouter();

    const onSignin = async () => {
       try {
         const response = await axios.post('/api/users/login', user);
         if(response.data.success){
           toast.success("Login Success!!");
           router.push('/profile');
         }
       } catch (error: any) {
          console.log("Login Failed: ", error.message);
          toast.error(error.message);
       } 
    }

    useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0){
        setButtonDisabled(false);
      }else setButtonDisabled(true);
    }, [user])
    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Signin</h1>
      <hr />
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
      onClick={onSignin}
      className="mt-1
      p-2 border border-gray-800
      rounded-lg mb-4 focus:outline-none
      hover:border-white
      focus:border-gray-600
      " >Signin</button>
      <Link href="/registerEmail">Forget Password</Link>
      <Link href="/signup">Go to Singup</Link>
    </div>
    )
}