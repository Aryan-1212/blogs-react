import React, { useEffect, useState } from "react";
import { Container, Loader, PostCard, Button } from "../components";
import dbService from "../appwrite/dbConf";
import authService from "../appwrite/auth";
import home1 from "../assets/home-1.png";
import { Link } from "react-router-dom";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [postCount, setPostCount] = useState(null);

  useEffect(() => {
    const userData = authService.getUser()
    userData.then((res)=>{
      const userId = res.$id
      dbService.getPostsById(userId).then((posts)=>{
        setIsLoading(false)
        setPosts(posts.documents)
        setPostCount(posts.total)
      })
    })

    // dbService.getPosts().then((posts) => {
    // dbService.getPostsById(userId).then((posts) => {
    //   if (posts) {
    //     setIsLoading(false);
    //     setPosts(posts.documents);
    //   }
    // });
  }, []);
  
  if(postCount === 0){
    return(
      <div>
        <Container>
          {/* <div className="h-96 bg-red-500 flex text-3xl ">
            You don&apos;t have any post!
            </div> */}
            <div className="w-full flex flex-col justify-center items-center md:flex-row">
              <div>
                <img src={home1} alt="" />
              </div>
              <div className="flex justify-center items-center md:items-start flex-col">
                <h1 className="text-xl md:text-4xl font-bold hover:text-gray-500">
                  You don&apos;t have any post!
                </h1>
                {/* <p className="text-center text-sm md:text-lg md:text-start">
                  Craft your blog effortlessly and make your voice heard. Start
                  building your personal online space today!
                </p> */}
                <Link to="/add-post">
                  <Button
                    children="Create Post"
                    className="mt-4"
                    label="Login"
                  />
                </Link>
              </div>
            </div>
          </Container>
      </div>
    )
  }

  return isLoading? <Loader/> : (
    <div className="py-8 w-full">
      <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/2 sm:w-1/3 md:w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
      </Container>
    </div>
  );
}

export default AllPosts;
