import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts, title, remove }) => {
  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>Посты не были найдены</h1>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "1rem" }}>{title}</h1>
      {posts.map((post, index) => (
        <PostItem
          remove={remove}
          key={post.id}
          number={index + 1}
          postContent={post}
        />
      ))}
    </div>
  );
};

export default PostList;
