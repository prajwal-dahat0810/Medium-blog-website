import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Signup } from "./pages/Signup.tsx";
import { Signin } from "./pages/Signin.tsx";
import { Blogs } from "./pages/Blogs.tsx";
import { Blog } from "./pages/Blog.tsx";
import { Publish } from "./components/Publish.tsx";
import { RecoilRoot } from "recoil";
import { Dashboard } from "./pages/Dashboard.tsx";
import { Update } from "./pages/Update.tsx";
import { About } from "./pages/About.tsx";
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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </>
  );
}

export default App;
