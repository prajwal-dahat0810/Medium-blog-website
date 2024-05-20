import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Signup } from "./pages/Signup.tsx";
import { Signin } from "./pages/Signin.tsx";
import { Blogs } from "./pages/Blogs.tsx";
import { Blog } from "./pages/Blog.tsx";
import { Publish } from "./components/Publish.tsx";
import { RecoilRoot } from "recoil";
function App() {
  return (
    <>
      <BrowserRouter>
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/publish" element={<Publish />} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </>
  );
}

export default App;
