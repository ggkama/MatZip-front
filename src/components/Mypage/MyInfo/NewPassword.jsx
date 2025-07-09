import React, { useState } from "react";
import { apiService } from "../../../api/apiService";

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPw: "",
    newPw: "",
    confirmPw: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isValid = () => {
    const { currentPw, newPw, confirmPw } = form;

    if (!currentPw || !newPw || !confirmPw) {
      alert("모든 항목을 입력해주세요.");
      return false;
    }

    const pattern =
      /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,30}$/;

    if (!pattern.test(newPw)) {
      alert("비밀번호는 8자 이상이며 특수문자를 포함해야 합니다.");
      return false;
    }

    if (newPw !== confirmPw) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid()) return;

    apiService
      .put("/api/profile/password", {
        currentPw: form.currentPw,
        newPw: form.newPw,
      })
      .then(() => {
        alert("비밀번호 변경이 완료되었습니다.");
      })
      .catch((err) => {
        const errorType = err.response?.data?.errorType;
        if (errorType === "E119") {
          alert("현재 비밀번호가 일치하지 않습니다.");
        } else {
          alert("요청 실패");
        }
      });
  };

  return (
    <div className="flex flex-col items-center pt-10 pb-20">
      <h2 className="text-3xl font-bold mb-6">비밀번호 변경</h2>
      <form onSubmit={handleSubmit} className="w-[500px] space-y-4">
        <InputField
          label="현재 비밀번호"
          name="currentPw"
          value={form.currentPw}
          onChange={handleChange}
        />
        <InputField
          label="새 비밀번호"
          name="newPw"
          value={form.newPw}
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
