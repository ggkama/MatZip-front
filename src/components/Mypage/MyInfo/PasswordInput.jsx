import React, { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const PasswordInput = () => {
  const [userPw, setUserPw] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/api/mypage/verify-password", { password: userPw }) // ✅ 서버 DTO 필드명에 맞춰 수정
      .then((res) => {
        alert("비밀번호가 일치합니다.");
        navigate("/my-info");
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          alert("비밀번호가 일치하지 않습니다.");
        } else {
          alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
      });
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10 pb-20">
      <h2 className="text-3xl font-bold mb-5">비밀번호 입력</h2>

      <form onSubmit={handleSubmit} className="w-[500px] space-y-10">
        <div className="flex flex-col items-start space-y-2 mt-5 w-full">
          <label htmlFor="userPw" className="text-sm font-medium">
            비밀번호
          </label>
          <input
            type="password"
            id="userPw"
            className="border border-orange-400 rounded px-3 py-2 w-full focus:outline-none"
            value={userPw}
            onChange={(e) => setUserPw(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 cursor-pointer"
        >
          확인
        </button>
      </form>
    </div>
  );
};

export default PasswordInput;
