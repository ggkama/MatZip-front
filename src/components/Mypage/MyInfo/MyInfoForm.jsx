import React, { useState, useEffect } from "react";
import { apiService } from "../../../api/apiService";
import { IoCamera } from "react-icons/io5";

const MyInfo = () => {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    userNickname: "",
    userPhone: "",
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);

  useEffect(() => {
    let previewToRevoke = null;

    apiService
      .get("/api/profile/form")
      .then((res) => {
        const data = res.data;
        setUserInfo({
          userId: data.userId || "",
          userName: data.userName || "",
          userNickname: data.userNickname || "",
          userPhone: data.userPhone || "",
        });

        if (data.profileImage) {
          setPreviewUrl(data.profileImage);
        } else {
          setPreviewUrl(null); // 기본 이미지 없음 처리
        }
      })
      .catch((err) => {
        console.error("내 정보 불러오기 실패", err);
        alert("내 정보를 불러오는 데 실패했습니다.");
      });

    return () => {
      if (previewToRevoke) {
        URL.revokeObjectURL(previewToRevoke);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isUnder10MB = file.size <= 10 * 1024 * 1024;

    if (!isImage) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    if (!isUnder10MB) {
      alert("이미지는 10MB 이하만 가능합니다.");
      return;
    }

    const tempUrl = URL.createObjectURL(file);
    setPreviewUrl(tempUrl);
    setProfileImageFile(file);
  };

  const isValid = () => {
    const { userName, userNickname, userPhone } = userInfo;
    const trimmedPhone = userPhone.trim();

    if (userName.trim().length < 2 || userName.trim().length > 20) return false;
    if (userNickname.trim().length < 2 || userNickname.trim().length > 20)
      return false;
    if (!/^010-\d{4}-\d{4}$/.test(trimmedPhone)) return false;

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid()) {
      alert("입력값을 다시 확인해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("userName", userInfo.userName.trim());
    formData.append("userNickname", userInfo.userNickname.trim());
    formData.append("userPhone", userInfo.userPhone.trim());

    if (profileImageFile) {
      formData.append("profileImage", profileImageFile);
    }

    apiService
      .put("/api/profile/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data.success) {
          alert("정보 수정 완료");
        } else {
          alert(res.data.message || "수정 실패");
        }
      })
      .catch((err) => {
        console.error("요청 실패", err);
        alert("요청 실패");
      });
  };

  return (
    <div className="flex flex-col items-center pt-10 pb-20">
      <h2 className="text-3xl font-bold mb-6">내 정보 수정</h2>

      <form onSubmit={handleSubmit} className="w-[500px] space-y-5">
        <div className="flex flex-col items-center">
          <label
            htmlFor="profile-upload"
            className="cursor-pointer relative w-30 h-30"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="프로필"
                className="w-30 h-30 rounded-full object-cover mb-2"
              />
            ) : (
              <div className="w-30 h-30 bg-gray-200 rounded-full mb-2" />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <IoCamera size={28} className="text-white opacity-80" />
            </div>
          </label>
          <input
            type="file"
            id="profile-upload"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <p className="text-lg font-bold mt-5">{userInfo.userId}</p>
        </div>

        <InputField
          label="이름"
          name="userName"
          value={userInfo.userName}
          onChange={handleChange}
        />
        <InputField
          label="닉네임"
          name="userNickname"
          value={userInfo.userNickname}
          onChange={handleChange}
        />
        <InputField
          label="전화번호"
          name="userPhone"
          value={userInfo.userPhone}
          onChange={handleChange}
          type="tel"
        />

        <button
          type="submit"
          className="w-full py-3 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          수정하기
        </button>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="flex flex-col space-y-1">
    <label className="text-sm">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="border border-orange-400 rounded px-3 py-2 focus:outline-none"
      type={type}
      required
    />
  </div>
);

export default MyInfo;
