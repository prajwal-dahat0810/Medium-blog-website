import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { Spinner } from "../components/Spinner";
import { AppBar } from "../components/AppBar";
import { useRecoilValue } from "recoil";
import { isLoggedIn } from "../store/atoms/Login";
import { UpdateBlog } from "../components/UpdateBlog";
export const Update = () => {
  const isLogged = useRecoilValue(isLoggedIn);
  const { id } = useParams();

  const { loading, blog } = useBlog({ id: id || "" });
  if (!isLogged) {
    return (window.location.href = "/signup");
  }

  if (loading || !blog) {
    return (
      <div className="">
        <AppBar />
        <div className=" h-screen flex  flex-col justify-center ">
          <div className=" flex  w-screen items-center justify-center">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <UpdateBlog blog={blog} />
    </div>
  );
};
