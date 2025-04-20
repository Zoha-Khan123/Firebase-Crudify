import React, {  useEffect, useState } from 'react'
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { db } from ".."
import { useNavigate } from "react-router-dom";
import {ProjectForm} from '..';

const CreateProject = () => {
  const navigate = useNavigate();
  const [userId,setUserId] = useState("")
  
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveLink: "",
    dateCreated: "",
    category: "",
    status: "",
    image: null,
  });

  // User uid nikalnay ka liya
  useEffect(()=>{
      const auth = getAuth();
      const user = auth.currentUser;
      console.log("auth",user.uid);
      setUserId(user.uid)

  },[])
  

// Add in database
const handleCreate = async (e) => {
  e.preventDefault();

  // Environment Variables
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

  // Project Start
  const { projectName, description, techStack, category, status, image } = formData;

  // Validation: Check if all required fields are filled
  if (!projectName || !description || !techStack || !category || !status || !image || !date) {
    toast.error("Please fill all fields");
    return;
  }

  try {
     // Upload image to Cloudinary
     const data = new FormData();
     data.append("file", formData.image); // Append the image file
     data.append("upload_preset", uploadPreset);
     data.append("cloud_name", cloudName);

     const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
       {
         method: "POST",
         body: data,
       }
     );

     const cloudinaryData = await res.json();

     if (!cloudinaryData.secure_url) {
       throw new Error("Image upload failed");
     }

    // Save project data to Firestore
    await addDoc(collection(db, "createUser"), {
      ...formData,
      uid:userId,

      image: cloudinaryData.secure_url, // Save the Cloudinary image URL
      createdAt: new Date(),
    });
    toast.success("Project added successfully!");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  } catch (error) {
    toast.error("Error adding project: " + error.message);
  }
}

  return (
    <ProjectForm
    formData={formData}
    setFormData={setFormData}
    onSubmit={handleCreate}
    buttonText="Submit Project"
  />
  )
}

export default CreateProject










