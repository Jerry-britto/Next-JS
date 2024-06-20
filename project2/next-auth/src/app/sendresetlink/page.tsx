"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function sendResetLink() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (email.length > 0) {
      setIsButtonDisable(false);
    } else {
      setIsButtonDisable(true);
    }
  }, [email]);

  const sendUserResetLink = async () => {
    try {
      setLoading(true);
      setIsButtonDisable(true);
      const res = await axios.post("/api/users/senduserresetlink", {
        email: email,
      });
      console.log(res);
      if (res.status === 200) {
        setIsButtonDisable(false);
        toast.success("Kindly check your email for resetting your password");
        setLoading(false);
      }
    } catch (error: any) {
      setError(true);
      setLoading(false);
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
        <h1 className="text-xl mb-2">{loading?"Processing...":"Update Password"}</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        placeholder="Enter email"
      />
      <button
        type="submit"
        disabled={isButtonDisable}
        className="bg-white text-black p-2 rounded-lg"
        onClick={sendUserResetLink}
      >
        Send Password Reset Link
      </button>

      {error && (
        <div>
          <h2 className="text-2xl text-white">
            Error occured please try again
          </h2>
        </div>
      )}
      <Toaster />
    </div>
  );
}
