import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const KakaoSignup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const accessToken = params.get("accessToken");

  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!accessToken) {
      alert("카카오 로그인 정보가 없습니다. 다시 시도해주세요.");
      navigate("/login");
    }
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/api/auth/signup/kakao", { accessToken, userName, userPhone })
      .then((response) => {
        console.log("응답 데이터", response);

        if (response.data.code === "S211") {
          alert("회원가입이 완료되었습니다.");
          navigate("/");
        }
      })
      .catch((error) => {
        setError("회원가입에 실패했습니다. 다시 시도해주세요.");
        console.error(err);
      });
  };

  return (
    <div className="flex justify-center items-center py-10 bg-white">
      <form
        onSubmit={handleSignup}
        className="bg-white p-10 rounded-lg w-150 shadow"
      >
        <h2 className="text-2xl font-semibold text-center mb-8">
          카카오 회원가입
        </h2>

        <h5 className="text-center mb-8">
          카카오에서 불러오지 않은 추가 정보를 입력해주세요.
        </h5>

        <div className="mb-4">
          <input
            type="text"
            placeholder="이름"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full border border-gray-300 rounded-[2vw] px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="전화번호"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            className="w-full border border-gray-300 rounded-[2vw] px-3 py-2"
            required
          />
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-orange-400 hover:bg-orange-700 cursor-pointer text-white py-2 rounded"
        >
          카카오로 회원가입
        </button>
      </form>
    </div>
  );
};

export default KakaoSignup;
