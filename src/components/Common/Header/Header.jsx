import React, { useState, useEffect } from "react";
import logo from "../../../assets/img/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(""); // 🔹 사용자 역할 저장용

  useEffect(() => {
    const raw = sessionStorage.getItem("tokens");
    const accessToken = raw ? JSON.parse(raw).accessToken : null;

    if (accessToken) {
      setIsLoggedIn(true);

      try {
        const decoded = jwtDecode(accessToken);
        const userRole = decoded.userRole || decoded.role || ""; // JWT payload에 있는 role 키 확인
        setRole(userRole);
      } catch (e) {
        console.error("JWT 디코딩 실패:", e);
        setRole("");
      }
    } else {
      setIsLoggedIn(false);
      setRole("");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem("tokens");
    setIsLoggedIn(false);
    setRole("");
    navigate("/");
  };

  // 🔹 ROLE에 따라 마이페이지 경로 변경
  const myPagePath = role === "ROLE_OWNER" ? "/owner-page" : "/my-page";

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
