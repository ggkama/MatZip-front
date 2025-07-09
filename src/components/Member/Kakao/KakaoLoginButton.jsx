import KakaoLoginImage from "../../../assets/img/kakao_login_button.png";

const REDIRECT_URI = "https://matzip.shop/api/auth/login/kakao";
const REST_API_KEY = "e63001707d8e08b9ff740c1cbfafd939";

const KakaoLoginButton = () => {
  const handleKakaoLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

    console.log(KAKAO_AUTH_URL);

    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button
      type="button"
      onClick={handleKakaoLogin}
      className="w-full flex justify-center items-center mt-3"
    >
      <img
        src={KakaoLoginImage}
        alt="카카오 로그인"
        className="w-[250px] h-auto"
      />
    </button>
  );
};

export default KakaoLoginButton;
