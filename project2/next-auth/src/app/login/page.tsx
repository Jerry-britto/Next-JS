"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      setButtonDisabled(true);
      const resposnse = await axios.post("/api/users/login", user);
      if (resposnse.status === 200) {
        console.log("Login  success ", resposnse.data);
        router.push("/profile");
      }
      setButtonDisabled(false);
    } catch (error: any) {
      console.log("Login failed ", error.message);
      toast.error("Login failed ");
      setLoading(false);
      setButtonDisabled(false);
    }
    finally{
      setUser(
        {
          email: "",
          password: "",
          username: "",
        }
      )
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />

      <Link href={"/sendresetlink"} className="ml-24 mb-2 underline hover:text-orange-500" >Forgot Password</Link>

      <button
        disabled={buttonDisabled}
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 hover:bg-white hover:text-black"
      >
        Login
      </button>

      <Link href="/signup" className="mt-2 rounded-lg bg-white text-black p-2">
        Signup
      </Link>

      <Toaster />
    </div>
  );
}
