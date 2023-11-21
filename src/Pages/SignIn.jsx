import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useAuth } from "../Context/AuthContext";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Configs/firebaseConfig";
import { Navigate } from "react-router";


export default function SimpleRegistrationForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated } = useAuth();
  if (isAuthenticated()) {
    return <Navigate to={"/home"} />;
  }
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Setel status login dengan menggunakan fungsi login dari konteks autentikasi
      login(userCredential.user);
        
    } catch (error) {
      console.error("Kesalahan saat memeriksa data pengguna:", error);
    }
  };

  return (
    <div className="flex justify-between bg-gradient-to-b from-[#3F4E4F] to-[#2C3639]">
      <div className="w-1/2 flex items-center justify-center h-screen ">
        <h1 className="text-6xl font-bold text-[#DCD7C9] ms-10">Manage and Control Your Cafe Stock</h1>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="flex justify-center ps-5 pe-5 pb-5 rounded-3xl shadow-2xl bg-[#DCD7C9]">
          <Card color="transparent" shadow={false} className="mx-auto mt-11">
            <Typography variant="h3" color="blue-gray">
              Sign In 
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Nice to meet you! Enter your details to Sign In.
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Email
                </Typography>
                <Input
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Password
                </Typography>
                <Input
                  type="password"
                  size="lg"
                  placeholder="********"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button className="mt-6" fullWidth onClick={handleSignIn}>
                sign in
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Don't have an account?{" "}
                <a href="/signUp" className="font-medium text-[#A27B5C]">
                  Sign Up
                </a>
              </Typography>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
