import React, { useState, useEffect } from "react";
import logo from "../../../assets/img/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const tokenInfo = sessionStorage.getItem("tokens");
    const userRole = sessionStorage.getItem("userRole");

    if (tokenInfo) {
      setIsLoggedIn(true);
      setRole(userRole || "");
    } else {
      setIsLoggedIn(false);
      setRole("");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem("tokens");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("userNo");

    setIsLoggedIn(false);
    setRole("");
    navigate("/");
  };

  // ROLE에 따른 마이페이지 경로 설정
  let myPagePath = "/my-page";
  if (role === "ROLE_OWNER") {
    myPagePath = "/owner-page";
  } else if (role === "ROLE_ADMIN") {
    myPagePath = "/admin";
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="header-container flex justify-between items-center py-2 max-w-5xl mx-auto px-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="MatZip" className="w-20 h-20" />
        </div>
        <div className="text-right text-sm">
          {isLoggedIn ? (
            <>
              <span
                className="text-black cursor-pointer"
                onClick={() => navigate(myPagePath)}
              >
                마이페이지
              </span>
              <span className="mx-3 text-gray-300">|</span>
              <span
                className="text-black cursor-pointer"
                onClick={handleLogout}
              >
                로그아웃
              </span>
            </>
          ) : (
            <>
              <span
                className="text-black cursor-pointer"
                onClick={() => navigate("/login")}
              >
                로그인
              </span>
              <span className="mx-3 text-gray-300">|</span>
              <span
                className="text-black cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                회원가입
              </span>
            </>
          )}
        </div>
      </div>

      <nav className="bg-orange-500">
        <ul className="flex justify-center gap-16 text-white font-semibold text-xl py-4">
          <li
            className="hover:underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            HOME
          </li>
          <li
            className="hover:underline cursor-pointer"
            onClick={() => navigate("/stores")}
          >
            맛집
          </li>
          <li
            className="hover:underline cursor-pointer"
            onClick={() => navigate("/notice")}
          >
            공지사항
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
