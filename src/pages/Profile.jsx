import React, { useEffect } from "react";
import { Loader, LogoutBtn } from "../components";
import profileImage from '../assets/profile.png'
import dbService from "../appwrite/dbConf";
import { useState } from "react";
import authService from "../appwrite/auth";

function Profile() {
  const [postCount, setpostCount] = useState(null)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userData = authService.getUser()
    userData.then((res)=>{
        const userId = res.$id;
        setUser(res)
        setIsLoading(false)
        const posts = dbService.getPostsById(userId);
        posts.then((res)=>{
            setpostCount(res.total)
        })
    })
  }, []);

  return isLoading? <Loader /> :
(
    <div className="flex flex-col items-center justify-center my-8">
      <div className="bg-white text-center shadow-lg rounded-lg p-6 max-w-sm w-full">
        <img
          src={profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          {user.name}
        </h1>
        <p className="text-gray-600 text-center mb-4">{user.email}</p>
        <div className="text-center mb-6">
          <span className="text-gray-800 font-medium">Posts: </span>
          <span className="text-indigo-600 font-bold">{postCount}</span>
        </div>
        <LogoutBtn />
      </div>
    </div>
  );
}

export default Profile;
