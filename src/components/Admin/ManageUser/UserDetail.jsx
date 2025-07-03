import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { IoArrowBack } from "react-icons/io5";

const UserDetail = () => {
  const { userNo } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axiosInstance
      .post("/api/admin/manage/user/detail", { userNo })
      .then((response) => {
        setUser(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
        navigate("/admin/user-list");
      });
  }, []);

  const handleWithdraw = () => {
    const confirm = window.confirm(
      `${user.userName}님을 탈퇴처리하시겠습니까?`
    );

    axiosInstance
      .post("/api/admin/manage/user/delete", { userNo })
      .then(() => {
        alert("회원 탈퇴가 완료되었습니다.");
        navigate("/admin/user-list");
      })
      .catch((error) => {
        const code = error.response.data.code;
        const message = error.response.data.message;

        if (code == "E111") {
          alert(message);
        } else {
          alert(message);
        }
      });
  };

  if (!user) return <p className="text-center mt-10">로딩 중...</p>;

  return (
    <div className="flex flex-col items-center pt-10 pb-20 px-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center text-orange-500 hover:underline"
        >
          <IoArrowBack className="mr-1" />
          뒤로가기
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          {user.userName}님_회원탈퇴
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            value={user.userName}
            disabled
            className="w-full border border-orange-300 px-4 py-2 rounded"
            placeholder="이름"
          />
          <input
            type="text"
            value={user.userNickName || ""}
            disabled
            className="w-full border border-orange-300 px-4 py-2 rounded"
            placeholder="닉네임"
          />
          <input
            type="text"
            value={user.userPhone || ""}
            disabled
            className="w-full border border-orange-300 px-4 py-2 rounded"
            placeholder="전화번호"
          />
          <input
            type="text"
            value={user.userRole}
            disabled
            className="w-full border border-orange-300 px-4 py-2 rounded"
            placeholder="권한"
          />
          <input
            type="text"
            value={user.enrollDate}
            disabled
            className="w-full border border-orange-300 px-4 py-2 rounded"
            placeholder="가입일"
          />
        </div>

        <p className="text-center text-sm mt-6 text-red-500">
          회원 {user.userName}님을 탈퇴시키겠습니까?
        </p>

        <button
          onClick={handleWithdraw}
          className="mt-4 w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded font-semibold"
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default UserDetail;
