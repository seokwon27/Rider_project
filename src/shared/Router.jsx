import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/home/Home";
import Mypage from "../pages/myPage/Mypage";

const Router = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Layout user={user} setUser={setUser}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute user={user}>
                <Mypage user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};
export default Router;
