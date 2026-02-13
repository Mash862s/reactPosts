import { useEffect, useState } from "react";
import { usePosts } from "../components/hooks/usePosts";
import { useFetching } from "../components/hooks/useFetching";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/Loader/Loader";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import PostForm from "../components/PostForm";
import PostService from "../components/API/PostService";
import { getPageCount } from "../utils/page";

const defaultList = [
  {
    id: 1,
    title: "ааа",
    body: "JavaScript - язык программирования",
  },
  {
    id: 2,
    title: "HTML",
    body: "HTML - тело сайта",
  },
  {
    id: 3,
    title: "CSS",
    body: "CSS - стили для сайта",
  },
];

function Posts() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({
    sort: "",
    query: "",
  });

  const [modal, setModal] = useState(false);

  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts(response.data);

      const totalCount = response.headers["x-total-count"];

      setTotalPages(getPageCount(totalCount, limit));
    },
  );

  useEffect(() => {
    fetchPosts(limit, page);
  }, []);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }; // чтобы прокинуть пропсы от ребенка к родителю

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
    fetchPosts(limit, page);
  };

  return (
    <div className="App">
      <MyButton style={{ marginTop: "2rem" }} onClick={() => setModal(true)}>
        Добавить пост
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />

      <PostFilter filter={filter} setFilter={setFilter} />

      {postError && (
        <h1 style={{ textAlign: "center", color: "red" }}>
          Произошла ошибка {postError}
        </h1>
      )}
      {isPostsLoading ? (
        <Loader />
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title="Posts from PostsService"
        />
      )}
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
