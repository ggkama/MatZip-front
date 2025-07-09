import axios from "axios";
import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navi = useNavigate();
  const [isEmailConfirm, setIsEmailConfirm] = useState(false);
  const [error, setError] = useState({
    idError: "",
    nickNameError: "",
    emailError: "",
  });

  /* 이메일 인증코드 전송 */
  const sendCode = (e) => {
    const email = document.querySelector('input[name="userId"]').value;

    const data = {
      userId: email,
    };

    axiosInstance
      .post("/api/auth/send-code", data, { auth: false })
      .then((response) => {
        if (response.data.code == "S200") {
          alert(response.data.message);
        }
      })
      .catch(() => {
        alert("인증 코드 전송에 실패했습니다. 다시 시도해주세요.");
      });
  };

  /* 인증 코드 확인 */
  const emailSubmit = (e) => {
    const email = document.querySelector('input[name="userId"]').value;
    const code = document.querySelector('input[name="code"]').value;

    const data = { email, code };

    axiosInstance
      .post("/api/auth/verify-code", data, { auth: false })
      .then((response) => {
        console.log(response);

        if (response.data.code == "S201") {
          alert(response.data.message);
          setIsEmailConfirm(true);
        } else {
          alert(response.data.message);
          setIsEmailVerified(false);
        }
      })
      .catch(() => {
        alert("이메일 인증 코드를 다시 확인해주세요.");
        setIsEmailConfirm(false);
      });
  };

  /* 회원가입 */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEmailConfirm) {
      alert("인증코드를 받아 이메일을 확인해주세요.");
      return;
    }

    const data = {
      userId: document.querySelector('input[name="userId"]').value,
      userPw: document.querySelector('input[name="userPw"]').value,
      userName: document.querySelector('input[name="userName"]').value,
      userNickName: document.querySelector('input[name="userNickName"]').value,
      userPhone: document.querySelector('input[name="userPhone"]').value,
    };

    axiosInstance
      .post("/api/auth/signup", data, { auth: false })
      .then((response) => {
        console.log(response);
        alert("회원가입이 완료되었습니다.");
        navi("/login");
      })
      .catch((error) => {
        const errorCode = error.response.data.code;
        const errorMessage = error.response.data.message;

        if (errorCode === "E100") {
          setError({
            idError: errorMessage,
            nickNameError: "",
            emailError: "",
          });
        } else if (errorCode === "E101") {
          setError({
            idError: "",
            nickNameError: errorMessage,
            emailError: "",
          });
        } else if (errorCode === "E102") {
          setError({
            idError: "",
            nickNameError: "",
            emailError: errorMessage,
          });
        }
        console.log(errorMessage);
      });
  };

  return (
    <div className="flex justify-center items-center py-10 bg-white">
      <form
        className="bg-white p-10 rounded-lg w-150 shadow"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center mb-8">회원가입</h2>

        {/* 이메일 */}
        <div className="mb-6">
          <label className="block mb-1">이메일</label>
          <div className="flex gap-2">
            <input
              type="email"
              name="userId"
              className="w-full border border-gray-300 rounded px-3 py-2 "
              required
            />
          </div>
          {error.idError && <p className="text-red-500">{error.idError}</p>}

          <div className="flex justify-center mt-3">
            <button
              type="button"
              className="bg-orange-300 hover:bg-orange-500 cursor-pointer text-white text-sm px-4 py-2 rounded"
              onClick={sendCode}
            >
              이메일 인증코드 전송
            </button>
          </div>
        </div>

        {/* 인증코드 */}
        <div className="mb-4">
          <label className="block mb-1">인증코드</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="code"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <button
              type="button"
              className="bg-orange-300 hover:bg-orange-500 cursor-pointer text-white text-sm px-3 py-1 rounded w-auto whitespace-nowrap"
              onClick={emailSubmit}
            >
              인증코드 확인
            </button>
          </div>
          {error.emailError && (
            <p className="text-red-500">{error.emailError}</p>
          )}
        </div>

        {/* 비밀번호 */}
        <div className="mb-4">
          <label className="block mb-1">비밀번호</label>
          <input
            type="password"
            name="userPw"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
          <h6 className="text-red-400">8자 이상, 최소 하나의 특수문자 포함</h6>
        </div>

        {/* 이름 */}
        <div className="mb-4">
          <label className="block mb-1">이름</label>
          <input
            type="text"
            name="userName"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* 닉네임 */}
        <div className="mb-4">
          <label className="block mb-1">닉네임</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="userNickName"
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          {error.nickNameError && (
            <p className="text-red-500">{error.nickNameError}</p>
          )}
        </div>

        {/* 연락처 */}
        <div className="mb-6">
          <label className="block mb-1">연락처</label>
          <input
            type="tel"
            name="userPhone"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="010-1234-5678"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-400 hover:bg-orange-700 cursor-pointer text-white py-2 rounded"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
