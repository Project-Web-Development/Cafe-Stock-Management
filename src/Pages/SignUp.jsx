import React, { useState, useEffect } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function SignUpForm() {
  const { isAuthenticated ,login, signUp } = useAuth();
  const navigate = useNavigate();
  
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
    try {
      // Lakukan logika pendaftaran pengguna di sini menggunakan fungsi signUp dari AuthContext
      // Ganti data yang diperlukan dengan formData yang ada
      const userEmail = await signUp(
        formData.email,
        formData.password,
        formData
      );
      if (userEmail) {
        // Jika pendaftaran berhasil, panggil fungsi login untuk menyetel pengguna
        login(userEmail);
        navigate("/Home");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Tindakan penanganan kesalahan jika perlu
    }
  };

  return (
    <div className="flex justify-center">
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
            <a href="/" className="font-medium text-gray-900">
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
