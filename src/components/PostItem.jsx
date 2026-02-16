import React, { useEffect, useState } from "react";
import MyButton from "./UI/button/MyButton";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const PostItem = ({ postContent, remove }) => {
  const router = useNavigate();

  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {postContent.id}. {postContent.title}
        </strong>
        <div>{postContent.body}</div>
      </div>
      <div className="post__btn">
        <MyButton onClick={() => router(`/posts/${postContent.id}`)}>
          Открыть
        </MyButton>
        <MyButton onClick={() => remove(postContent)}>Удалить</MyButton>
      </div>
    </div>
  );
};

export default PostItem;
