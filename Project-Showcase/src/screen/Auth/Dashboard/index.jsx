import React, { useEffect, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { collection, onSnapshot, doc, deleteDoc , setDoc } from "firebase/firestore";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { auth } from "../../../screen";
import { db, Loader } from "../../../screen";


const Dashboard = () => {
  // Logout
  const navigate = useNavigate();
  const [loader,setLoader] = useState(true)

  const handleLogout = async () => {
  try {
    await auth.signOut()
    window.location.href="/login"
    console.log("User logout Successfully");
     toast.success("User logout Successfully",{
        position:"top-center",
      })
    
  } catch (error) {
    console.log("Error logging out",error.message);
     toast.error(error.message,{
        position:"bottom-center",
      })
  }
  };
  

  // Add User
  const [addUser, setAddUser] = useState([]);
  
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "createUser"),
      (querySnapshot) => {
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAddUser(usersData);
        setLoader(false)
        console.log("Current users: ", usersData);
      }
    );

    return () => unsubscribe();
  }, []);







  // Delete User
  const deleteData = async (uid) => {
    try {
      await deleteDoc(doc(db, "createUser", uid));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  // Edit Data
  const editData = (user) => {
    navigate("/edit", { state: user }); // Pass the selected user's data to the edit page
  };
  return (
    <>
    
        <div className="min-h-screen bg-white">
    
        {/* Header */}
        <div className="border-b border-gray-300 py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Community Project Showcase</h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-600 mb-6">
            Discover, share, and get inspired by amazing projects from developers worldwide.
          </p>
  
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/create-project">
              <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">Create +</button>
            </Link>
            <button onClick={handleLogout} className="border border-black text-black px-6 py-2 rounded hover:bg-gray-100 transition">Logout</button>
          </div>
        </div>
  
        {/* Cards */}
        {
      loader ? (<Loader/>) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-start gap-6 p-6 bg-white">
         {
          addUser.map((project,index)=>{
            return(
              <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col gap-3 max-w-[400px] mx-auto">
                {project.image ? (<img src={project.image} alt={project.title}  className="w-full h-auto object-cover rounded-lg mb-4"/>):("No Image")}
                <h2 className="text-xl font-bold text-gray-900 mb-2">{project.projectName}</h2>
                <p className="text-gray-700 text-sm mb-4">{project.description}</p>
  
                <div className="text-sm text-black space-y-1">
                <p><span className="font-semibold">Tech Stack:</span> {project.techStack}</p>
                <p><span className="font-semibold">Category:</span> {project.category}</p>
                <p><span className="font-semibold">Status:</span> {project.status}</p>
                <p><span className="font-semibold">Date:</span> {project.dateCreated} </p>
                </div>
  
                <div className="text-sm space-y-1 text-black">
                  <p><span className="font-semibold mr-2">GitHub:</span> {project.githubLink ? <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-900 underline hover:text-gray-700 break-all">{project.githubLink}</a> : <span>No Link</span>}</p>
                  <p><span className="font-semibold mr-2">Live Demo:</span>{project.liveLink ? <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-gray-900 underline hover:text-gray-700 break-all">{project.liveLink}</a> :  <span>No Link</span>}</p>
                </div>
  
               <div className="flex justify-between mt-auto">
                <button  onClick={() => editData(project)} className="bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-700 transition">Edit</button>
               <button onClick={() => deleteData(project.id)} className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded text-sm font-medium hover:bg-gray-50 transition">Delete</button>
               </div>
               
  
              </div>
            )
          })
         }
        </div>
         )
        }
    </div>
     
   
  </>
  );
};

export default Dashboard;
