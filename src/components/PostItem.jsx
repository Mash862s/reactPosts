import React from "react";
import MyButton from "./UI/button/MyButton";

const PostItem = ({ postContent, number, remove }) => {
  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {postContent.id}. {postContent.title}
        </strong>
        <div>{postContent.body}</div>
      </div>
      <div className="post__btn">
        <MyButton onClick={() => remove(postContent)}>Удалить</MyButton>
      </div>
    </div>
  );
};

export default PostItem;
