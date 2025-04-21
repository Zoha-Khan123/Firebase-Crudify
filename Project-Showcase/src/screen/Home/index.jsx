import React from "react";
import { Link } from "react-router-dom";


const Home = () => {

  return (
    <div className="h-screen">

      {/* Heading */}
      <div>
        <h1 className="text-xl font-bold p-5">CRUDify</h1>
      </div>


      <div className="flex flex-col justify-center items-center">
        {/* Image */}
        <div className="w-[400px] h-[400px]">
          <img src="/start-02.jpg" alt="" />
        </div>


        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <Link to="/signup">
            <button className="py-3 px-16 text-white bg-black rounded-md hover:scale-105 transition duration-300 ease-in-out">
              SignUp
            </button>
          </Link>
          <Link to="/login">
            <button className="py-3 px-16 text-white bg-black rounded-md hover:scale-105 transition duration-300 ease-in-out">
              Login
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Home;
