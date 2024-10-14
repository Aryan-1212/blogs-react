import React, { useEffect, useState } from "react";
import { Container, Loader, PostCard } from "../components";
import dbService from "../appwrite/dbConf";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dbService.getPosts().then((posts) => {
      if (posts) {
        setIsLoading(false);
        setPosts(posts.documents);
      }
    });
  }, []);

  return isLoading? <Loader/> : (
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

export default AllPosts;
