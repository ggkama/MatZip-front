import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = location.pathname === "/";

  useEffect(() => {
    const tokenInfo = sessionStorage.getItem("tokens");
    setIsLoggedIn(!!tokenInfo);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  const handleMyPage = () => {
    const storedRole = sessionStorage.getItem("userRole");
    if (storedRole === "ROLE_OWNER") navigate("/owner-page");
    else if (storedRole === "ROLE_ADMIN") navigate("/admin");
    else navigate("/my-page");
  };

  // 위치 설정
  const positionClass = isHome
    ? isScrolled
      ? "fixed top-0 left-0 w-full z-50"
      : "absolute top-0 left-0 w-full z-50"
    : "fixed top-0 left-0 w-full z-50";

  // 배경색 설정
  const bgClass = isHome && !isScrolled ? "bg-transparent" : "bg-[#FF6A3D]";

  return (
    <header
      className={`${positionClass} h-[75px] transition-colors duration-300 ${bgClass}`}
    >
      <nav>
        <div className="header-container flex justify-between items-center py-2 max-w-5xl mx-auto">
          {/* 로고 */}
          <div
            className="flex items-center gap-2 cursor-pointer font-extrabold text-[30px] text-white"
            onClick={() => navigate("/")}
          >
            맛집
          </div>

          {/* 메뉴 */}
          <ul className="flex justify-center gap-16 font-medium text-[18px] py-4 text-white">
            <li
              className="relative cursor-pointer font-semibold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              onClick={() => navigate("/")}
            >
              HOME
            </li>
            <li
              className="relative cursor-pointer font-semibold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              onClick={() => navigate("/stores")}
            >
              STORE
            </li>
            <li
              className="relative cursor-pointer font-semibold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              onClick={() => navigate("/notice")}
            >
              NOTICE
            </li>
          </ul>

          {/* 로그인 / 마이페이지 */}
          <div className="text-right text-[16px] font-semibold text-white">
            {isLoggedIn ? (
              <>
                <span
                  className="cursor-pointer hover:opacity-65"
                  onClick={handleMyPage}
                >
                  마이페이지
                </span>
                <span className="mx-3">|</span>
                <span
                  className="cursor-pointer hover:opacity-65"
                  onClick={handleLogout}
                >
                  로그아웃
                </span>
              </>
            ) : (
              <>
                <span
                  className="cursor-pointer hover:opacity-65"
                  onClick={() => navigate("/login")}
                >
                  로그인
                </span>
                <span className="mx-3 text-white">|</span>
                <span
                  className="cursor-pointer hover:opacity-65"
                  onClick={() => navigate("/signup")}
                >
                  회원가입
                </span>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
