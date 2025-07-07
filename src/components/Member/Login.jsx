import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import KakaoLoginButton from "./Kakao/KakaoLoginButton";

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
          const userInfo = response.data.data;

          // 세션스토리지에 사용자 정보 저장
          sessionStorage.setItem(
            "tokens",
            JSON.stringify({
              accessToken: userInfo.accessToken,
              refreshToken: userInfo.refreshToken,
            })
          );

          sessionStorage.setItem(
            "user",
            JSON.stringify({
              userNo: userInfo.userNo,
              userName: userInfo.userName,
              userNickName: userInfo.userNickName,
              userRole: userInfo.userRole,
            })
          );

          alert(response.data.message);

          if (userInfo.userRole === "ROLE_ADMIN") {
            navi("/admin");
          } else {
            navi("/");
          }
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
        <KakaoLoginButton />
      </form>
    </div>
  );
};
export default Login;
