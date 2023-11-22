// Dilarang Untuk Mengubah Code Yang Dibungkus dengan tanda Seru (!!!!!)

import React, { useState, useEffect } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
export default function SignUpForm() {
  const { isAuthenticated, login, signUp } = useAuth();
  const navigate = useNavigate();
  const [erorAuth, setErorAuth] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/Home");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    try {
      const userEmail = await signUp(
        formData.email,
        formData.password,
        formData
      );
      if (userEmail) {
        login(userEmail);
        navigate("/Home");
      }
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    } catch (error) {
      console.error("Error during registration:", error);

      setErorAuth(true);


      setTimeout(() => {
        setErorAuth(false);
      }, 3000); 
    }
  };

  return (
    <div className="flex justify-between bg-gradient-to-b from-[#3F4E4F] to-[#2C3639]">
      <div className="w-1/2 flex items-center justify-center h-screen">
        <h1 className="text-6xl font-bold text-[#DCD7C9] ms-10">
          Manage and Control Your Cafe Stock
        </h1>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="flex justify-center ps-5 pe-5 pb-5 rounded-3xl shadow-2xl bg-[#DCD7C9]">
        <Stack sx={{ width: "100%", position: "relative" }}>
          <Card color="transparent" shadow={false} className="mx-auto mt-11">
            <Typography variant="h4" color="blue-gray">
              Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Nice to meet you! Enter your details to register.
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <Button className="mt-6" fullWidth onClick={handleSubmit}>
                sign up
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <a href="/" className="font-medium text-[#A27B5C]">
                  Sign In
                </a>
              </Typography>
            </form>
          </Card>
          {erorAuth && (
              <Alert
                severity="error"
                style={{
                  width: "100%",
                  position: "absolute",
                  bottom: "0px",
                  left: "0",
                  right: "0",
                  margin: "0",
                  borderRadius: "100",
                }}
              >
                please try again
              </Alert>
            )}
            </Stack>
        </div>
      </div>
    </div>
  );
}
