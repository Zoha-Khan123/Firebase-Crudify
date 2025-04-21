import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, Loader } from "../../../screen";
import { useEffect } from "react";

const Login = () => {

  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loader,setLoader] = useState(true)
  
  
    useEffect(()=>{
      auth.onAuthStateChanged((Users)=>{
        if(Users){
          console.log(Users);
          window.location.href = "/dashboard"
        }else{
          console.log(Users);
          
          setLoader(false)
        }
      })
    },[])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword( auth , email , password );
      console.log("User Login Successfully");
      window.location.href = "/dashboard";
      toast.success("User Login Successful",{
         position:"top-center",
       })
    } catch (error) { 
      console.log(error.message);
      toast.error(error.message,{
        position:"bottom-center",
      })
    }
  }


  return (
    <>
    {
      loader ?  (<Loader/>) : (
        <div className="flex justify-center items-center h-screen w-full bg-white">
        <div className="border border-gray-300 rounded-2xl shadow-xl bg-white px-10 py-16 w-[400px] space-y-6 ">
          <div className="text-center">
            <h1 className="font-extrabold text-3xl mb-2">Welcome!</h1>
            <p className="text-gray-500 font-medium">Sign in to continue</p>
          </div>
  
          <ToastContainer />
  
          <form onSubmit={handleLogin} className=" flex flex-col space-y-6 ">
            {/* Email */}
            <div>
              <input
                type="email"
                value={email}
                placeholder="Enter email"
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
  
            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 text-white bg-black rounded-md hover:scale-105 transition duration-300 ease-in-out"
            >
              Login
            </button>
            
          </form>
        </div>
      </div>
      )
    }
     
    </>
  );
};

export default Login;





// const auth = getAuth(app);
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
        
//         console.log("Login",user);
//         toast.success("Login Successful!");

        
//         setEmail("");
//         setPassword("");

//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 1500);
//       })
//       .catch((error) => {
//         toast.error(error.message);
//       });
//   };


//   // Protect from login page 
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       navigate("/dashboard");
//     } else{
//       setLoader(false)
//     }
//   });