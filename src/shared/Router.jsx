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
        <Route path="/" element={<Landing />} />

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
