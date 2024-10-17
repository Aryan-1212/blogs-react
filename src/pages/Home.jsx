import React, { useState, useEffect } from "react";
import { Container, PostCard, Button } from "../components";
import dbService from "../appwrite/dbConf";
import { useSelector } from "react-redux";
import home1 from "../assets/home-1.png";
import home2 from "../assets/home-2.png";
import home3 from "../assets/home-3.png";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

function Home() {
  const [posts, setPosts] = useState([]);
  const status = useSelector((state) => state.authSlice.status);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!status) {
      setPosts([]);
    }
    dbService.getPosts().then((posts) => {
      if (posts) {
        setLoading(false);
        setPosts(posts.documents);
      }
    });
  }, [status]);

  if (!status) {
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
          <div className="space-y-10 md:space-y-20">
            <div className="w-full flex flex-col justify-center items-center md:flex-row">
              <div>
                <img src={home1} alt="" />
              </div>
              <div className="flex justify-center items-center md:items-start flex-col">
                <h1 className="text-xl md:text-4xl font-bold hover:text-gray-500">
                  Share Your Story with the World
                </h1>
                <p className="text-center text-sm md:text-lg md:text-start">
                  Craft your blog effortlessly and make your voice heard. Start
                  building your personal online space today!
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

            <hr className="my-8 border-t-2 border-gray-300 md:hidden" />            

            <div className="w-full flex flex-col md:flex-row">
              <div className="flex justify-center items-center md:items-end text-end flex-col">
                <h1 className="text-xl text-center md:text-end md:text-4xl font-bold hover:text-gray-500">
                  Read Stories from Around the World
                </h1>
                <p className="text-center text-sm md:text-lg md:text-end">
                  Discover stories from people around the world. Read about
                  their experiences, lessons, and more.
                </p>
              </div>
              <div>
                <img src={home3} alt="" />
              </div>
            </div>

            <hr className="my-8 border-t-2 border-gray-300" />

            <div className="w-full flex flex-col justify-center items-center">
              <div className="flex justify-center items-center text-end flex-col mb-20">
                <h1 className="text-2xl sm:text-4xl text-center md:text-6xl font-bold hover:text-gray-500">
                Bring Your Ideas to Life
                </h1>
                <p className="text-center text-sm md:text-lg">
                Create a blog that reflects your unique perspective. Share, inspire, and connect with a global audience in just a few clicks!
                </p>
              </div>
            </div>

          </div>
        </Container>
      </div>
    );
  }

  return loading ? (
    <Loader />
  ) : (
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

export default Home;
