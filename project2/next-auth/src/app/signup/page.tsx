"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
function SignUp() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSingup = async () => {
    try {
      setLoading(true);
      setButtonDisabled(true);
      const resposnse = await axios.post("/api/users/signup", user);
      if (resposnse.status === 200) {
        console.log("sign up success ", resposnse.data);
        toast.success("User Registration is a success. Kindly check your mail");
        setLoading(false);
        setButtonDisabled(false);
      }
    } catch (error: any) {
      console.log("Sign up failed ", error.message);
      toast.error("Sign up failed ", error.message);
      setLoading(false);
    } finally {
      setUser({
        email: "",
        password: "",
        username: "",
      });
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />

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

      <button
        disabled={buttonDisabled}
        onClick={onSingup}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 hover:bg-white hover:text-black"
      >
        Sign up
      </button>

      <Link href="/login" className="mt-2 rounded-lg bg-white text-black p-2">
        Login
      </Link>
      <Toaster />
    </div>
  );
}

export default SignUp;
