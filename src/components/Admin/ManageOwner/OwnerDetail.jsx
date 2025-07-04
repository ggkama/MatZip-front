import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { IoArrowBack } from "react-icons/io5";

const OwnerDetail = () => {
  const { registerNo } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axiosInstance
      .post("/api/admin/manage/owner/detail", { registerNo })
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
        navigate("/admin/owner-list");
      });
  }, []);

  const handleApprove = () => {
    const confirm = window.confirm(
      `${user.userName}님에게 사장님 권한을 부여하시겠습니까?`
    );
    if (!confirm) return;

    axiosInstance
      .post("/api/admin/manage/owner/approve", { registerNo })
      .then((response) => {
        alert(response.data.message);
        navigate("/admin/owner-list");
      })
      .catch((error) => handleApiError(error));
  };

  const handleReject = () => {
    const confirm = window.confirm(
      `${user.userName}님의 신청을 반려하시겠습니까?`
    );
    if (!confirm) return;

    axiosInstance
      .post("/api/admin/manage/owner/reject", { registerNo })
      .then(() => {
        alert("사장님 신청이 반려되었습니다.");
        navigate("/admin/owner-list");
      })
      .catch((error) => handleApiError(error));
  };

  const handleApiError = (error) => {
    const message = error.response.data.message;
    alert(message);
  };

  if (!user) {
    return <p className="text-center mt-10">로딩 중...</p>;
  }

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
          {user.userName}님 _ 사장님 신청
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            value={user.storeName}
            disabled
            className="w-full border border-orange-300 px-4 py-2 rounded"
            placeholder="이름"
          />
          <input
            type="text"
            value={user.businessNo}
            disabled
            className="w-full border border-orange-300 px-4 py-2 rounded"
            placeholder="닉네임"
          />
          <img
            src={`http://localhost:8080${user.image}`}
            alt="사장님 등록 이미지"
            className="w-full h-auto border border-orange-300 rounded"
          />
        </div>

        <p className="text-center text-sm mt-6 text-red-500">
          {user.userName}님을 사장님으로 등록하시겠습니까?
        </p>

        <button
          onClick={handleApprove}
          className="mt-4 w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded font-semibold"
        >
          권한 부여하기
        </button>
        <button
          onClick={handleReject}
          className="mt-4 w-full bg-white-400 hover:bg-orange-500 text-orange py-2 rounded font-semibold"
        >
          반려하기
        </button>
      </div>
    </div>
  );
};

export default OwnerDetail;
