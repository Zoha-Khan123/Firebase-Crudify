import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, db } from "../../../screen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const auth = getAuth(app);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password does not match!");
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data to Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        createdAt: new Date(),
      });

      toast.success("Signup Successful");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-white">
      <div className="border border-gray-300 rounded-2xl shadow-xl bg-white p-10 w-[400px] space-y-6 ">
        <div className="text-center">
          <h1 className="font-extrabold text-3xl mb-2">Hi!</h1>
          <p className="text-gray-500 font-medium">Create a new account</p>
        </div>

        <ToastContainer />

        <form onSubmit={handleSignup} className=" flex flex-col space-y-6 ">
          {/* Name */}
          <div>
            <input
              type="text"
              value={name}
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Confirm Passsword */}
          <div>
            <input
              type="password"
              value={confirmPassword}
              placeholder="Enter Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full py-3 text-white bg-black rounded-md hover:scale-105 transition duration-300 ease-in-out"
          >
            SignUp
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Signup;
