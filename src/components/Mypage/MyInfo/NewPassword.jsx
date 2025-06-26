import React, { useState } from "react";
import { apiService } from "../../../api/apiService";

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

  const isValid = () => {
    const { userPw, newUserPw, confirmPw } = form;

    if (!userPw || !newUserPw || !confirmPw) {
      alert("모든 항목을 입력해주세요.");
      return false;
    }

    const pattern =
      /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,30}$/;

    if (!pattern.test(newUserPw)) {
      alert("비밀번호는 8자 이상이며 특수문자를 포함해야 합니다.");
      return false;
    }

    if (newUserPw !== confirmPw) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    try {
      const res = await apiService.put("/api/users/password", {
        userPw: form.userPw,
        newUserPw: form.newUserPw,
      });

      if (res.data.code === "A200") {
        alert("비밀번호가 변경되었습니다.");
      } else {
        alert(res.data.message || "변경 실패");
      }
    } catch (err) {
      alert("요청 실패");
    }
  };

  return (
    <div className="flex flex-col items-center pt-10 pb-20">
      <h2 className="text-3xl font-bold mb-6">비밀번호 변경</h2>
      <form onSubmit={handleSubmit} className="w-[500px] space-y-4">
        <InputField
          label="비밀번호"
          name="userPw"
          value={form.userPw}
          onChange={handleChange}
        />
        <InputField
          label="새 비밀번호"
          name="newUserPw"
          value={form.newUserPw}
          onChange={handleChange}
        />
        <InputField
          label="새 비밀번호 재입력"
          name="confirmPw"
          value={form.confirmPw}
          onChange={handleChange}
        />

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

const InputField = ({ label, name, value, onChange }) => (
  <div className="flex flex-col space-y-1">
    <label className="text-sm">{label}</label>
    <input
      type="password"
      name={name}
      value={value}
      onChange={onChange}
      className="border border-orange-400 rounded px-3 py-2 focus:outline-none"
      required
    />
  </div>
);

export default ChangePassword;
