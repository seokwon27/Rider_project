import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Layout = ({ user, children }) => {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleLogout = () => {};

  return (
    <div>
      <header className="py-4 px-3">
        <nav className="flex justify-between">
          <Link to="/">홈</Link>
          <div className="space-x-4">
            {user ? (
              <>
                <button onClick={handleLogout}>로그아웃</button>
              </>
            ) : (
              <Link to="/login">로그인</Link>
            )}
          </div>
        </nav>
      </header>
      <main className="container mx-auto pt-10 main">{children}</main>
    </div>
  );
};

export default Layout;
