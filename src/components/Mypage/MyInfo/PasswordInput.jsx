import React, { useState } from "react";

const PasswordInput = () => {
  const [userPw, setUserPw] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`입력된 비밀번호: ${userPw}`);
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10 pb-20">
      <h2 className="text-3xl font-bold mb-5">비밀번호 입력</h2>

      <form onSubmit={handleSubmit} className="w-[500px] space-y-10">
        <div className="flex flex-col items-start space-y-2 mt-5">
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
