import React from "react";
import { ToastContainer } from "react-toastify";

const ProjectForm = ({ formData, setFormData, onSubmit, buttonText }) => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-white text-black my-8 px-4">
      <div className="border border-gray-300 rounded-2xl shadow-xl bg-white p-6 sm:p-10 w-full max-w-xl">
        <ToastContainer />
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="text-center">
            <h1 className="font-extrabold text-2xl sm:text-3xl mb-2">
              {buttonText === "Update Project"
                ? "Edit Project"
                : "Create Project"}
            </h1>
          </div>

          {/* Name */}
    <div>
    <label className="block mb-1 font-medium">Project Name</label>
    <input type="text" value={formData.projectName} onChange={(e)=>setFormData({...formData,projectName:e.target.value})} placeholder='Enter Project Title' className="w-full px-4 py-2 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-black"/>
    </div>

    {/* Description */}
    <div>
    <label className="block mb-1 font-medium">Description</label>
    <textarea value={formData.description} onChange={(e)=>setFormData({...formData,description:e.target.value})} placeholder='Write a short description' className="w-full px-4 py-2 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-black"></textarea>
    </div>

    
    {/* Tecnologies */}
    <div>
    <label className="block mb-1 font-medium">Tech Stack</label>
      <input type="text" value={formData.techStack} onChange={(e)=>setFormData({...formData,techStack:e.target.value})} placeholder='React, Firebase, Tailwind' className="w-full px-4 py-2 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-black"/>
    </div>


  {/* Existing Image */}
  {formData.image && (
    <div>
      <label className="block mb-1 font-medium">Current Image</label>
      <img src={formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image}  alt="Current" className="w-full object-contain rounded-xl mb-4"/>
    </div>
  )}

  {/* Upload New Image */}
  <div>
  <label className="block mb-1 font-medium">Upload New Image</label>
  <input type="file"  onChange={(e)=>setFormData({...formData,image:e.target.files[0]})}  placeholder='Upload project screenshot' className="w-full px-4 py-2 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-black"/>
  </div>

    {/*  Github Link */}
    <div>
    <label className="block mb-1 font-medium">GitHub Link</label>
      <input type="url" value={formData.githubLink} onChange={(e)=>setFormData({...formData,githubLink:e.target.value})} placeholder='Paste GitHub repo link' className="w-full px-4 py-2 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-black"/>
    </div>

    {/* Live Demo Link */}
    <div>
    <label className="block mb-1 font-medium">Live Demo Link</label>
      <input type="url" value={formData.liveLink} onChange={(e)=>setFormData({...formData,liveLink:e.target.value})} placeholder='Paste live site URL' className="w-full px-4 py-2 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-black"/>
    </div>
    

    {/* Date created */}
    <div>
      <input type="date" value={formData.dateCreated} onChange={(e)=>setFormData({...formData,dateCreated:e.target.value})} className="w-full px-4 py-2 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-black"/>
    </div>

    {/* Select Category */}
    <div>
    <select value={formData.category} onChange={(e)=>setFormData({...formData,category:e.target.value})} className="w-full px-4 py-2 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-black">
    <option>Select Category</option>
          <option value="Web App">Web App</option>
          <option value="Mobile App">Mobile App</option>
          <option value="Other">Other</option>
    </select>
    </div>

    {/* Status */}
    <div>
    <select value={formData.status} onChange={(e)=>setFormData({...formData,status:e.target.value})} className="w-full px-4 py-2 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-black">
    <option>Select Status</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
    </select>
    </div>


    <button
            type="submit"
            className="w-full py-3 text-white bg-black rounded-md hover:scale-105 transition duration-300 ease-in-out"
          >
           {buttonText}
          </button>
    </form>
      </div>
    </div>
  );
};

export default ProjectForm;
