import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../components/hooks/useFetching";
import PostService from "../components/API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
  const params = useParams();
  const [postById, setPostById] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPosById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPostById(response.data);
  });

  const [fetchCommentByPostId, isCommentLoading, errorComment] = useFetching(
    async (id) => {
      const response = await PostService.getCommentByIdPost(id);
      setComments(response.data);
    },
  );

  useEffect(() => {
    fetchPosById(params.id);
    fetchCommentByPostId(params.id);
  }, []);

  return (
    <div>
      <h1>Вы открыли пост с id={params.id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {postById.id}. {postById.title}
        </div>
      )}
      <h1>Комментарии поста</h1>
      {isCommentLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((comment) => (
            <div style={{ marginTop: "2rem" }}>
              <h5>{comment.email}</h5>
              <div>{comment.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;
