import React, { useState, useEffect } from "react";
import { apiService } from "../../../api/apiService";

const MyInfo = () => {
  const [userInfo, setUserInfo] = useState({
    userId: "user0101",
    userName: "홍길동",
    userNickname: "길동이",
    userPhone: "010-1234-5678",
    profileImage: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

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

    setPreviewUrl(URL.createObjectURL(file));
    setUserInfo((prev) => ({ ...prev, profileImage: file }));
  };

  const isValid = () => {
    const { userName, userNickname, userPhone } = userInfo;
    if (userName.length < 2 || userName.length > 20) return false;
    if (userNickname.length < 2 || userNickname.length > 20) return false;
    if (!/^010-\d{4}-\d{4}$/.test(userPhone)) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) {
      alert("입력값을 다시 확인해주세요.");
      return;
    }

    const formData = new FormData();
    Object.entries(userInfo).forEach(([key, val]) => {
      if (val) formData.append(key, val);
    });

    try {
      const res = await apiService.put("/api/user/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.code === "A200") {
        alert("정보 수정 완료");
      } else {
        alert(res.data.message || "수정 실패");
      }
    } catch (err) {
      alert("요청 실패");
    }
  };

  return (
    <div className="flex flex-col items-center pt-10 pb-20">
      <h2 className="text-3xl font-bold mb-6">내 정보 수정</h2>

      <form onSubmit={handleSubmit} className="w-[500px] space-y-5">
        <div className="flex flex-col items-center">
          <label htmlFor="profile-upload" className="cursor-pointer">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="프로필"
                className="w-24 h-24 rounded-full object-cover mb-2"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full mb-2" />
            )}
          </label>
          <input
            type="file"
            id="profile-upload"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <p className="text-sm text-gray-500">{userInfo.userId}</p>
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
