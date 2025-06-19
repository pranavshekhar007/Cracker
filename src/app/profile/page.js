

"use client";
import React, { useState, useContext, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";
import { LoggedDataContext } from "../context/context";
import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";
import AccountDetails from "../Components/AccountDetails";
import Footer from "../Components/Footer";
import { userUpdate } from "../services/authentication.service";

const Profile = () => {
   
  const [imageSrc, setImageSrc] = useState(null);
  const fileInputRef = useRef(null);

  const { loggedUserData , updateLoggedUserData  } = useContext(LoggedDataContext);
  const router = useRouter();

  const [selectedSection, setSelectedSection] = useState("details");

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
    profileImage: "",
});


    useEffect(() => {
  if (loggedUserData) {
     setFormData({
      firstName: loggedUserData.firstName || "",
      lastName: loggedUserData.lastName || "",
      email: loggedUserData.email || "",
      profileImage: loggedUserData.profileImage || "",
    });
      setImageSrc(loggedUserData.profileImage || "");
  }
}, [loggedUserData]);


  // logout 

    useEffect(() => {
    if (selectedSection === "logout") {
      updateLoggedUserData(null); 
      localStorage.removeItem("user"); 
       toast.success("Logged out successfully!");
      router.push("/login"); 
    }
  }, [selectedSection]);

  useEffect(() => {
    if (!loggedUserData) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loggedUserData, router]);
  
    const handleChange = (e) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };
  
    const handleSave = async () => {
      updateLoggedUserData({ ...loggedUserData, ...formData });
     
      const payload = {

  userId: loggedUserData?._id,
   firstName: formData.firstName,
  lastName: formData.lastName,
  email: formData.email,
    profileImage: formData.profileImage,
};

      try{
        const res = await userUpdate(payload);
        console.log("updated succesfully" , res);
          setIsEditing(false);
      }
      catch(error){
        console.log("update erro" , error)
      }
    
    };

      if (!loggedUserData) {
    return (
      <div className="loading-div">
        <p>Loading user data...</p>
      </div>
    );
  }
     
    const handleClick = () => {
    fileInputRef.current.click();
  };

   const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
      setFormData((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  }
};


 

  return (
    <>
      <Navbar />
      <div className="user-profile">
        
        <div className="profile-section d-flex gap-3">
          
          {/* 🔵 Left Menu */}
        
          <AccountDetails/>

          {/* 🔵 Right Content */}
          <div className="profile-right mt-lg-5 pt-lg-4">
           <div className="my-details">
           <h3>My details</h3>


          {/* Profile pic Info */}
          <div className="personal-info">
          <h5>Profile picture</h5>
         {/* profile input */}
              <div className="signup-div d-flex  my-4">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="d-none"
                     disabled={!isEditing}
                />
                <div
                   onClick={() => {
        if (isEditing) handleClick();
      }}
                  className={`signup-profile rounded-circle border ${
        isEditing ? "border-success" : "border-secondary"
      } overflow-hidden`}
                  style={{
                    width: "70px",
                    height: "70px",
                    cursor: "pointer",
                    transition: "border 0.3s",
                  }}
                >
                  <img
                    src={
                      imageSrc ||
                      "https://cdn-icons-png.flaticon.com/128/552/552721.png"
                    }
                    alt="Profile"
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
      </div>

      {/* Personal Info */}
      <div className="personal-info">
        <h5>Personal Information</h5>
        <div className="d-flex gap-2">
          {isEditing ? (
            <>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="editable-input"
                style={{height: "38px"}}
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="editable-input"
                  style={{height: "38px"}}
              />
            </>
          ) : (
            <>
              <p className="name"   style={{height: "38px"}}>{loggedUserData.firstName}</p>
              <p className="name"   style={{height: "38px"}}>{loggedUserData.lastName}</p>
            </>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="personal-info">
        <h5>Email Address</h5>
        <div className="d-flex gap-2">
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="editable-input"
                style={{height: "38px"}}
            />
          ) : (
            <p className="name"   style={{height: "38px"}}>{loggedUserData.email}</p>
          )}
        </div>
      </div>

      {/* Phone Number (non-editable) */}
      <div className="personal-info">
        <h5>Phone Number</h5>
        <div className="d-flex gap-2">
          <p className="name">{loggedUserData.phone}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="personal-info d-flex gap-2">
        <button className="change-password">Change password</button>
        {isEditing ? (
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>

      

            </div>
            </div>

        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Profile;





