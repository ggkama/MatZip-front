import React from "react";
import logo from "../../../assets/img/logo.svg";

const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex justify-between items-center px-6 py-2">
        <div className="flex items-center gap-2">
          <img src={logo} alt="MatZip" className="w-20 h-20" />
        </div>
        <div className="text-right text-sm">
          <span className="text-black">로그인</span>
          <span className="mx-3 text-gray-300">|</span>
          <span className="text-black">회원가입</span>
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
