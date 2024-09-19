import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Mypage from "../pages/myPage/Mypage";
import Feed from "../pages/feed/Feed";
import Landing from "../pages/landing/Landing";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route path="/feed" element={<Feed />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
