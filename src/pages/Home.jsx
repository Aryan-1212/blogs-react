import React, { useState, useEffect } from "react";
import { Container, PostCard, Button } from "../components";
import dbService from "../appwrite/dbConf";
import { useSelector } from "react-redux";
import home1 from '../assets/home-1.png'
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const status = useSelector((state) => state.authSlice.status);


  useEffect(() => {
    if(!status){
      setPosts([])
    }
    dbService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, [status]);

  if (posts.length == 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>


          {/* <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div> */}

            <div className="w-full flex">
              <div>
                <img src={home1} alt="" />
              </div>
              <div className="flex justify-center items-start flex-col">
                <h1 className="text-4xl font-bold hover:text-gray-500">
                Share Your Story with the World
                </h1>
                <p className="text-start">
                Craft your blog effortlessly and make your voice heard. Start building your personal online space today!
                </p>
                <Link to="/signup">
                <Button
                  children="Get started"
                  className="mt-4"
                  label="Login"
                  />
                  </Link>
              </div>
            </div>

        </Container>
      </div>
    );
  } else {
    return (
      <div className="py-8 w-full">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
