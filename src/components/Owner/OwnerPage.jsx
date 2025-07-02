import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RegisterStoreForm from "../Owner/RegiseterStoreForm/RegisterStoreForm";
import {
  IoPerson,
  IoLockClosed,
  IoPersonRemoveSharp,
  IoPencil,
  IoStorefront,
  IoCalendarNumber,
} from "react-icons/io5";

const OwnerPage = () => {
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchStoreData = async () => {
    setLoading(true);
    const rawTokens = sessionStorage.getItem("tokens");
    const accessToken = rawTokens ? JSON.parse(rawTokens).accessToken : null;

    try {
      const res = await axios.get("http://localhost:8080/api/owner/stores", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setStoreData(res.data); // 수정 모드
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setStoreData(null); // 등록 모드
      } else {
        console.error("가게 정보 조회 실패", error);
        alert("가게 정보를 불러오는 데 실패했습니다.");
      }
    } finally {
      setShowForm(true);
      setLoading(false);
    }
  };

  const handleRegisterStore = () => {
    fetchStoreData();
  };

  if (loading) return <p className="text-center mt-10">로딩 중...</p>;
  if (showForm) return <RegisterStoreForm initialData={storeData} />;

  return (
    <div className="max-w-xl mx-auto pt-10 pb-20 text-center mypage-content">
      <h2 className="text-3xl font-bold mb-8">사장님 마이페이지</h2>

      <div className="flex flex-col items-center mb-8">
        <div className="w-30 h-30 bg-gray-200 rounded-full flex items-center justify-center text-4xl mb-4" />
        <p className="text-sm text-gray-500">user0101</p>
        <p className="text-lg font-bold">홍길동 사장님 환영합니다.</p>
        <button className="mt-2 px-4 py-1 bg-black text-white text-sm rounded hover:bg-gray-800">
          로그아웃
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <MenuButton
          icon={<IoPerson size={30} />}
          label="내 정보 수정"
          onClick={() => navigate("/my-info")}
        />
        <MenuButton
          icon={<IoLockClosed size={30} />}
          label="비밀번호 변경"
          onClick={() => navigate("/new-password")}
        />
        <MenuButton
          icon={<IoPersonRemoveSharp size={30} />}
          label="회원 탈퇴"
          onClick={() => navigate("/account-delete")}
        />
        <MenuButton
          icon={<IoStorefront size={30} />}
          label="가게 정보 등록"
          onClick={handleRegisterStore}
        />
        <MenuButton
          icon={<IoCalendarNumber size={30} />}
          label="가게 예약 내역"
          onClick={() => navigate("/store-reservation")}
        />
        <MenuButton
          icon={<IoPencil size={30} />}
          label="가게 리뷰 내역"
          onClick={() => navigate("/store-review")}
        />
      </div>
    </div>
  );
};

const MenuButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center border border-gray-300 rounded-md py-10 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-300"
  >
    <div className="mb-4 text-black">{icon}</div>
    <span className="text-sm">{label}</span>
  </button>
);

export default OwnerPage;
