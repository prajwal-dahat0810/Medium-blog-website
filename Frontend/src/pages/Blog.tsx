import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { AppBar } from "../components/AppBar";
import { useRecoilValue } from "recoil";
import { isLoggedIn } from "../store/atoms/Login";
export const Blog = () => {
  const isLogged = useRecoilValue(isLoggedIn);
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  if (!isLogged) {
    console.log("is in blog", isLogged);
    return (window.location.href = "/signup");
  }
  if (loading || !blog) {
    return (
      <div>
        <AppBar />
        <div className=" h-screen  flex  flex-col justify-center ">
          <div className=" flex items-center justify-center">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};
