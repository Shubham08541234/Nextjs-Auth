'use client'

import axios from "axios";
import { useEffect, useState } from "react";


export default function RegisteredEmail(){

    const [email, setEmail] = useState("");

    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await axios.post('api/users/resetPassConfirm', {email});
            console.log("res From resetPassConfirm: ", res);
        } catch (error: any) {
            throw new Error("Error while fetching Data: ", error.message);
        }
    }


    return <form 
  onSubmit={onSubmit}
  className="flex flex-col gap-4 p-8 rounded-2xl shadow-lg w-full max-w-md"
>
  <h2 className="text-2xl font-semibold text-center text-white">
    Reset Password
  </h2>

  <div className="flex flex-col gap-2">
    <label htmlFor="email" className="text-sm font-medium text-white">
      Email
    </label>

    <input
      type="email"
      id="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>

  <button
    type="submit"
    className="bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
  >
    Submit
  </button>
</form>

}