import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { useAuth } from "../Context/AuthContext";
  import React, { useState } from "react";
  import { useNavigate } from 'react-router-dom';
  import { getDoc, doc } from 'firebase/firestore';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { db } from '../Configs/firebaseConfig';
  import { auth } from '../Configs/firebaseConfig';
  export default function SimpleRegistrationForm() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSignIn = async (e) => {
      e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
      const userEmail = userCredential.user.email;
      console.log('email', userEmail); // Perbarui ini agar Anda mencetak alamat email yang benar
  
      const userDocRef = doc(db, 'Users', userEmail);
      const userDocSnap = await getDoc(userDocRef);
  
      console.log('cek ada gak : ', userDocSnap.exists); // Perbarui ini agar Anda memeriksa apakah dokumen ada
  
      if (userDocSnap.exists) {
        const userData = userDocSnap.data();
        console.log('data Users :', userData);
        login(userData);

        navigate('/Home');
      } else {
        console.error('Data User Not Found In Firestore');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
    }
  
    return (
      <div className="flex justify-center" >
        <Card color="transparent" shadow={false} className="mx-auto mt-11">
          <Typography variant="h4" color="blue-gray">
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
              <a href="/signUp" className="font-medium text-gray-900">
                Sign Up
              </a>
            </Typography>
          </form>
        </Card>
      </div>
    );
  }
  