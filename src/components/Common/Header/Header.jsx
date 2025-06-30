import React, { useState, useEffect } from "react";
import logo from "../../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navi = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  /* 로그인 상태 확인 */
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLogin(!token);
    }
  }, [isLogin]);

  /* 로그아웃 */
  /* 토큰 삭제 메서드 만들고 다시 수정해야함 */
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLogin(false);
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="header-container flex justify-between items-center py-2 max-w-5xl">
        <div className="flex items-center gap-2">
          <img src={logo} alt="MatZip" className="w-20 h-20" />
        </div>
        <div className="text-right text-sm">
          {isLogin ? (
            <>
              <span
                className="text-black cursor-pointer"
                onClick={() => navi("/my-page")}
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
                onClick={() => navi("/login")}
              >
                로그인
              </span>
              <span className="mx-3 text-gray-300">|</span>
              <span
                className="text-black cursor-pointer"
                onClick={() => navi("/signup")}
              >
                회원가입
              </span>
            </>
          )}
        </div>
      </div>

      <nav className="bg-orange-500">
        <ul className="flex justify-center gap-15 text-white font-semibold text-xl py-4">
          <li className="hover:underline cursor-pointer">HOME</li>
          <li className="hover:underline cursor-pointer">맛집</li>
          <li className="hover:underline cursor-pointer">공지사항</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
