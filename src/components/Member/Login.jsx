import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const Login = () => {
  const navi = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      userId: document.querySelector('input[name="userId"]').value,
      userPw: document.querySelector('input[name="userPw"]').value,
    };

    axiosInstance
      .post("/api/auth/login", data, { auth: false })
      .then((response) => {
        if (response.data.code === "S203") {
          const {
            accessToken,
            refreshToken,
            userNo,
            userId,
            userName,
            userNickName,
            userRole,
          } = response.data.data;

          // ✅ 세션에 저장
          const tokens = {
            accessToken,
            refreshToken,
            userNo,
            userId,
            userName,
            userNickName,
            userRole,
          };
          sessionStorage.setItem("tokens", JSON.stringify(tokens));
          alert(response.data.message);
          navi("/");
        }
      })
      .catch((error) => {
        if (error.response.data.code == "E105") {
          setError(error.response.data.message);
        } else {
          setError("서버를 한 번 확인해주세요.");
        }
      });
  };

  return (
    <div className="flex justify-center items-center py-10 bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg w-150 shadow"
      >
        <h2 className="text-2xl font-semibold text-center mb-8">로그인</h2>

        <div className="mb-4">
          <input
            type="text"
            name="userId"
            className="w-full border border-gray-300 rounded-[2vw] px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="userPw"
            className="w-full border border-gray-300 rounded-[2vw] px-3 py-2"
          />
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-orange-400 hover:bg-orange-700 cursor-pointer text-white py-2 rounded"
        >
          로그인
        </button>
      </form>
    </div>
  );
};
export default Login;
