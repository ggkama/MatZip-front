import React, { useState } from "react";
import { apiService } from "../../../api/apiService";

const AccountDelete = () => {
  const [userPw, setUserPw] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!userPw) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    try {
      const res = await apiService.delete("/api/users", { userPw });

      if (res.data.code === "A200") {
        alert("회원탈퇴가 완료되었습니다.");
        // localStorage.clear(); navigate("/login");
      } else {
        alert(res.data.message || "회원탈퇴에 실패했습니다.");
      }
    } catch (err) {
      alert("요청 실패");
    }
  };

  return (
    <div className="flex flex-col items-center pt-10 pb-20">
      <h2 className="text-3xl font-bold mb-4">회원탈퇴</h2>
      <p className="text-red-500 text-sm mb-6">회원탈퇴를 진행하시겠습니까?</p>
      <form onSubmit={handleDelete} className="w-[500px] space-y-4">
        <div className="flex flex-col space-y-1">
          <label className="text-sm">비밀번호</label>
          <input
            type="password"
            value={userPw}
            onChange={(e) => setUserPw(e.target.value)}
            className="border border-orange-400 rounded px-3 py-2 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 cursor-pointer"
        >
          탈퇴하기
        </button>
      </form>
    </div>
  );
};

export default AccountDelete;
