import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import dbService from "../appwrite/dbConf";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    dbService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="py-8 w-full">
      <Container>
        {posts.map(() => (
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ))}
      </Container>
    </div>
  );
}

export default AllPosts;
