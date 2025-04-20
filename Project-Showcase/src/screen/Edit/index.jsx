import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../Firebase/FirebaseConfig";
import ProjectForm from "../../components/ProjectForm";

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state;
  const [formData, setFormData] = useState(project || {});

  const handleEdit = async (e) => {
    e.preventDefault();

   
     // Environment Variables
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

    try {
      let imageUrl = formData.image;

      // If a new image is uploaded, upload it to Cloudinary
      if (formData.image instanceof File) {
        const data = new FormData();
        data.append("file", formData.image);
        data.append("upload_preset", uploadPreset);
        data.append("cloud_name", cloudName);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );

        if (!res.ok) {
          throw new Error("Failed to upload image to Cloudinary");
        }

        const cloudinaryData = await res.json();

        if (!cloudinaryData.secure_url) {
          throw new Error("Image upload failed");
        }

        imageUrl = cloudinaryData.secure_url;
      }

      // Update Firestore
      const updatedData = { ...formData, image: imageUrl };
      const projectRef = doc(db, "createUser", project.id);
      await updateDoc(projectRef, updatedData);

      // Show success toast and navigate
      toast.success("Project updated successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      // Show error toast
      toast.error("Update failed: " + error.message);
    }
  };

  return (
    <>
      <ProjectForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleEdit}
        buttonText="Update Project"
      />
    </>
  );
};

export default Edit;