"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const res = await axios.post("/api/users/verifyemail", { token });
      if (res.status === 200) {
        setVerified(true);  
      }
    } catch (error: any) {
      setError(true);
      toast.error("Email Verification failed");
      console.log("Verification failed due to", error.message);
    }
  };

  useEffect(() => {
    // using vanilla JS
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")

    // using next js
    // const { query } = router;
    // const urlToken: any = query.token;
    // setToken(urlToken || "");
  }, []);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      <button
        className={`p-2 bg-white text-black rounded-lg ${!(token==='')?'block':'hidden'}`}
        onClick={verifyUserEmail}
      >
        Verify Email
      </button>

      {verified && (
        <div>
          <h2>Verified</h2>
          <Link href="/login">Visit login</Link>
        </div>
      )}

      {
        error && (
          <div>
            <h2>Error: Token is invalid or expired</h2>
          </div>
        )
      }
    </div>
  );
}

export default VerifyEmail;
