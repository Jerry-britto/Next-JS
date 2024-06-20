"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function resetUserPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const [error, setError] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (password.length > 0) {
      setIsButtonDisable(false);
    } else {
      setIsButtonDisable(true);
    }
  }, [password]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const resetPassword = async () => {
    try {
      setLoading(true);
      setIsButtonDisable(true);
      const res = await axios.post("/api/users/resetpassword", {
        token,
        newPassword: password,
      });
      console.log(res);
      if (res.status === 200) {
        setIsButtonDisable(false);
        toast.success("Password updated successfully");
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
      <h1 className="text-xl mb-2">
        {loading ? "Processing..." : "Reset Password"}
      </h1>
      <h2>{token === ""?"":token}</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        placeholder="Enter password"
      />
      <button
        type="submit"
        disabled={isButtonDisable}
        className="bg-white text-black p-2 rounded-lg"
        onClick={resetPassword}
      >
        Update Password
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
