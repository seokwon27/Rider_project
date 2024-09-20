import { Link, useNavigate } from "react-router-dom";
import homeIcon from "../assets/homeIcon.svg";
import useUserStore from "../store/useUserStore";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const { user, setUser } = useUserStore(); // Zustand store 사용

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/");
  };
  return (
    <div>
      <header className="py-9 px-10 bg-black flex items-center">
        {/* 왼쪽 네비게이션 */}
        <div className="absolute left-10 flex items-center">
          <Link to="/" className="text-white hover:text-gray-400">
            <img src={homeIcon} alt="Home" className="w-30" />
          </Link>
        </div>
        {/* 가운데 메시지 */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          {user ? <p className="text-white text-lg">{`${user.nickname}님 안녕하세요!`}</p> : null}
        </div>
        {/* 오른쪽 네비게이션 */}
        <div className="absolute right-10 flex space-x-4 text-sm items-center gap-2">
          {user ? (
            <>
              <Link to="/home" className="text-white hover:text-gray-400 ">
                지도보기
              </Link>
              <Link to="/feed" className="text-white hover:text-gray-400">
                모아보기
              </Link>
              <Link to="/mypage" className="text-white hover:text-gray-400">
                마이페이지
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-black font-normal py-2 px-5 rounded-full hover:invert"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/home" className="text-white hover:text-gray-400">
                지도보기
              </Link>
              <Link to="/feed" className="text-white hover:text-gray-400">
                모아보기
              </Link>
              <Link to="/signup" className="text-gray-400 hover:text-blue-400 underline">
                회원가입
              </Link>
              <Link to="/login" className="bg-white text-gray-800 font-normal py-2 px-5 rounded-full hover:invert">
                로그인
              </Link>
            </>
          )}
        </div>
      </header>
      <main className="centered-content">{children}</main>
    </div>
  );
};

export default Layout;
