import React from "react";
import { useNavigate } from "react-router-dom";
import {
  IoPerson,
  IoLockClosed,
  IoPeopleSharp,
  IoPencil,
  IoCreateOutline,
  IoStorefront,
} from "react-icons/io5";

const Admin = () => {
  const navi = useNavigate();

  const MenuButton = ({ icon, label, onClick }) => (
    <button
      onClick={onClick}
      className="w-40 aspect-square flex flex-col items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 transition shrink-0"
    >
      <div className="mb-3 text-gray-700">{icon}</div>
      <span className="text-sm font-medium text-gray-800">{label}</span>
    </button>
  );

  return (
    <div className="max-w-screen-xl mx-auto py-12 px-4 text-center">
      <h2 className="text-2xl font-semibold mb-10">관리자 페이지</h2>
      <div className="flex justify-center gap-6 overflow-x-auto">
        <MenuButton
          icon={<IoLockClosed size={48} />}
          label="사장님 권한 관리"
          onClick={() => navi("/admin/owner-list")}
        />
        <MenuButton
          icon={<IoPeopleSharp size={48} />}
          label="회원 관리"
          onClick={() => navi("/admin/user-list")}
        />
        <MenuButton
          icon={<IoStorefront size={48} />}
          label="가게 관리"
          onClick={() => navi("/admin/store-list")}
        />
        <MenuButton
          icon={<IoCreateOutline size={48} />}
          label="리뷰 관리"
          onClick={() => navi("/admin/review-list")}
        />
      </div>
    </div>
  );
};

export default Admin;
