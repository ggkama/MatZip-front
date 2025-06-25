import React from "react";
import { useNavigate } from "react-router-dom";
import {
  IoPerson,
  IoLockClosed,
  IoPersonRemoveSharp,
  IoCalendar,
  IoPencil,
  IoPeopleSharp,
} from "react-icons/io5";
const MyPage = () => {
  const navi = useNavigate();
  return (
    <div className="max-w-xl mx-auto pt-10 pb-20 text-center mypage-content">
      {/* 제목 */}
      <h2 className="text-3xl font-semibold mb-8">마이페이지</h2>
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
        <MenuButton
          icon={<IoPerson size={30} />}
          label="내 정보 수정"
          onClick={() => navi("/my-info")}
        />
        <MenuButton
          icon={<IoLockClosed size={30} />}
          label="비밀번호 변경"
          onClick={() => navi("/new-password")}
        />
        <MenuButton
          icon={<IoPersonRemoveSharp size={30} />}
          label="회원 탈퇴"
          onClick={() => navi("/account-delete")}
        />
        <MenuButton
          icon={<IoCalendar size={30} />}
          label="내 예약 내역"
          onClick={() => navi("/my-reservation-list")}
        />
        <MenuButton icon={<IoPencil size={30} />} label="내 리뷰 내역" />
        <MenuButton icon={<IoPeopleSharp size={30} />} label="사장님 신청" />
      </div>
    </div>
  );
};

const MenuButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center border border-gray-300 rounded-md py-10 hover:bg-gray-100 cursor-pointer"
  >
    <div className="text-black mb-4">{icon}</div>
    <span className="text-sm">{label}</span>
  </button>
);

export default MyPage;
