import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const userNo = params.get("userNo");
    const userRole = params.get("userRole");

    if (accessToken && userNo) {
      sessionStorage.setItem("tokens", JSON.stringify({ accessToken }));

      sessionStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem("userNo", userNo);
      sessionStorage.setItem("userRole", userRole);

      alert("카카오 로그인 성공!");
      navigate("/");
    } else {
      alert("로그인 정보가 없습니다.");
      navigate("/login");
    }
  }, []);

  return <div>로그인 처리 중입니다...</div>;
};

export default KakaoLogin;
