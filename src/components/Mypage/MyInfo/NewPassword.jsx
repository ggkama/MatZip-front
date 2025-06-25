// src/components/MyPage/ChangePassword.jsx
import React, { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const [form, setForm] = useState({
    userPw: "",
    newUserPw: "",
    confirmPw: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = (pw) => {
    const pattern =
      /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,30}$/;
    return pattern.test(pw);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userPw, newUserPw, confirmPw } = form;

    if (!userPw || !newUserPw || !confirmPw) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    if (!validatePassword(newUserPw)) {
      alert("비밀번호는 8자 이상이며 특수문자를 포함해야 합니다.");
      return;
    }

    if (newUserPw !== confirmPw) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.put(
        "/api/users/password",
        { userPw, newUserPw },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.code === "A200") {
        alert("비밀번호가 변경되었습니다.");
        // 예: navigate("/mypage");
      } else {
        alert(res.data.message || "오류가 발생했습니다.");
      }
    } catch (err) {
      alert("서버 요청 실패");
    }
  };

  return (
    <div className="flex flex-col items-center pt-10 pb-20">
      <h2 className="text-3xl font-bold mb-6">비밀번호 변경</h2>
      <form onSubmit={handleSubmit} className="w-[500px] space-y-4">
        <div className="flex flex-col space-y-1">
          <label className="text-sm">비밀번호</label>
          <input
            type="password"
            name="userPw"
            value={form.userPw}
            onChange={handleChange}
            className="border border-orange-400 rounded px-3 py-2 focus:outline-none"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm">새 비밀번호</label>
          <input
            type="password"
            name="newUserPw"
            value={form.newUserPw}
            onChange={handleChange}
            className="border border-orange-400 rounded px-3 py-2 focus:outline-none"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm">새 비밀번호 재입력</label>
          <input
            type="password"
            name="confirmPw"
            value={form.confirmPw}
            onChange={handleChange}
            className="border border-orange-400 rounded px-3 py-2 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="mt-5 w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 cursor-pointer"
        >
          수정하기
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
