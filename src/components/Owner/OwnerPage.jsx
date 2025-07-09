import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import {
  IoPerson,
  IoLockClosed,
  IoPersonRemoveSharp,
  IoPencil,
  IoStorefront,
  IoCalendarNumber,
} from "react-icons/io5";
import { apiService } from "../../api/apiService";

const API_URL = window.ENV?.API_URL || import.meta.env.VITE_API_URL;

const OwnerPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    profileImage: null,
  });

  useEffect(() => {
    // 유저 프로필 불러오기
    apiService
      .get("/api/profile/form")
      .then((res) => {
        const data = res.data;
        setUserInfo({
          userId: data.userId,
          userName: data.userName,
          profileImage: data.profileImage ? `${data.profileImage}` : null,
        });
      })
      .catch((err) => {
        console.error("유저 정보 불러오기 실패", err);
        alert("유저 정보를 불러오는 데 실패했습니다.");
      });

    // ✅ storeNo 세션 저장 (공통 처리)
    axiosInstance
      .get("/api/owner/stores")
      .then((res) => {
        const storeData = res.data;
        if (storeData?.storeNo) {
          sessionStorage.setItem("storeNo", storeData.storeNo); // ✅ 저장
        }
      })
      .catch((err) => {
        console.error("storeNo 저장 실패", err);
      });
  }, []);

  const handleRegisterStore = () => {
    setLoading(true);
    axiosInstance
      .get("/api/owner/stores")
      .then((res) => {
        navigate("/register-store", { state: { initialData: res.data } });
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          navigate("/register-store", { state: { initialData: null } });
        } else {
          console.error("가게 정보 조회 실패", error);
          alert("가게 정보를 불러오는 데 실패했습니다.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogout = () => {
    sessionStorage.clear();
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  if (loading) return <p className="text-center mt-10">로딩 중...</p>;

  return (
    <div className="max-w-xl mx-auto pt-10 pb-20 text-center mypage-content">
      <h2 className="text-3xl font-bold mb-8">사장님 마이페이지</h2>

      <div className="flex flex-col items-center mb-8">
        {userInfo.profileImage ? (
          <img
            src={userInfo.profileImage}
            alt="프로필"
            className="w-30 h-30 rounded-full object-cover mb-4"
          />
        ) : (
          <div className="w-30 h-30 bg-gray-200 rounded-full flex items-center justify-center text-4xl mb-4" />
        )}
        <p className="text-sm text-gray-500">{userInfo.userId}</p>
        <p className="text-lg font-bold">
          {userInfo.userName} 사장님 환영합니다.
        </p>
        <button
          onClick={handleLogout}
          className="mt-2 px-4 py-1 bg-black text-white text-sm rounded hover:bg-gray-800"
        >
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
