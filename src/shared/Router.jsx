import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Mypage from "../pages/myPage/Mypage";
import ProtectedRoute from "../components/ProtectedRoute";
import { useState } from "react";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Feed from "../pages/feed/Feed";
import Layout from "../components/Layout";
import Landing from "../pages/landing/Landing";

// Layout을 적용할 때 사용하는 컴포넌트
const MainLayout = ({ user, setUser }) => (
  <Layout user={user} setUser={setUser}>
    <Outlet />
  </Layout>
);

const Router = () => {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        {/* 랜딩 페이지는 Layout을 적용하지 않음 */}
        <Route path="/" element={<Landing />} />

        {/* Layout을 적용할 라우트 설정 */}
        <Route element={<MainLayout user={user} setUser={setUser} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feed" element={<Feed setUser={setUser} />} />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute user={user}>
                <Mypage user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
