import React from "react";
import {
  FaUser,
  FaLock,
  FaUserTimes,
  FaCalendarAlt,
  FaPen,
  FaUserTie,
} from "react-icons/fa";

const MyPage = () => {
  return (
    <div className="max-w-xl mx-auto py-10 text-center mypage-content">
      {/* 제목 */}
      <h2 className="text-2xl font-semibold mb-8">마이페이지</h2>
      {/* 유저 정보 */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-3xl mb-4"></div>
        <p className="text-sm text-gray-500">user0101</p>
        <p className="text-lg font-bold">홍길동님 환영합니다.</p>
        <button className="mt-2 px-4 py-1 bg-black text-white text-sm rounded">
          로그아웃
        </button>
      </div>

      {/* 메뉴 버튼들 */}
      <div className="grid grid-cols-3 gap-4">
        <MenuButton icon={<FaUser size={30} />} label="내 정보 수정" />
        <MenuButton icon={<FaLock size={30} />} label="비밀번호 변경" />
        <MenuButton icon={<FaUserTimes size={30} />} label="회원 탈퇴" />
        <MenuButton icon={<FaCalendarAlt size={30} />} label="내 예약 내역" />
        <MenuButton icon={<FaPen size={30} />} label="내 리뷰 내역" />
        <MenuButton icon={<FaUserTie size={30} />} label="사장님 신청" />
      </div>
    </div>
  );
};

const MenuButton = ({ icon, label }) => (
  <button className="flex flex-col items-center justify-center border border-gray-300 rounded-md py-10 hover:bg-gray-100">
    <div className="text-black mb-4">{icon}</div>
    <span className="text-sm">{label}</span>
  </button>
);

export default MyPage;
