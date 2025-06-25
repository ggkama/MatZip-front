import React, { useState, useEffect } from "react";
import axios from "axios";

const MyInfo = () => {
  const [userInfo, setUserInfo] = useState({
    userId: "user0101",
    userPw: "",
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
    const selectedFile = e.target.files[0];
    const allowedTypes = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    const maxSize = 1024 * 1024 * 10;

    if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    if (selectedFile && selectedFile.size > maxSize) {
      alert("이미지 크기는 10MB 이하만 가능합니다.");
      return;
    }

    const preview = URL.createObjectURL(selectedFile);
    setPreviewUrl(preview);
    setUserInfo((prev) => ({ ...prev, profileImage: selectedFile }));
  };

  const validateForm = () => {
    const { userName, userNickname, userPw, userPhone } = userInfo;

    if (!userName.trim() || userName.length < 2 || userName.length > 20) {
      alert("이름은 2자 이상 20자 이하로 입력해주세요.");
      return false;
    }

    if (
      !userNickname.trim() ||
      userNickname.length < 2 ||
      userNickname.length > 20
    ) {
      alert("닉네임은 2자 이상 20자 이하로 입력해주세요.");
      return false;
    }
    if (!/^010-\d{4}-\d{4}$/.test(userPhone)) {
      alert("전화번호는 010-0000-0000 형식으로 입력해주세요.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    Object.entries(userInfo).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const response = await axios.put("/api/user/update", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.code === "A200") {
        alert("정보 수정이 완료되었습니다.");
        // TODO: 마이페이지로 이동
      } else {
        alert("수정 실패: " + response.data.message);
      }
    } catch (error) {
      alert("오류 발생: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center pt-10 pb-20">
      <h2 className="text-3xl font-bold text-center mb-6">내 정보 수정</h2>

      <div className="flex w-full max-w-4xl flex-col items-center pt-6 px-6">
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="profile-upload" className="cursor-pointer">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="프로필"
                className="w-24 h-24 rounded-full object-cover mb-3"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl mb-3" />
            )}
          </label>
          <input
            type="file"
            id="profile-upload"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <p className="text-sm text-gray-600">{userInfo.userId}</p>
          <p className="text-2xl font-bold">{userInfo.userName}님</p>
        </div>

        <form onSubmit={handleSubmit} className="w-[500px] space-y-4">
          <div className="flex flex-col space-y-1">
            <label className="text-sm">이름</label>
            <input
              name="userName"
              value={userInfo.userName}
              onChange={handleChange}
              className="border border-orange-400 rounded px-3 py-2 focus:outline-none"
              type="text"
              minLength={2}
              maxLength={20}
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm">닉네임</label>
            <input
              name="userNickname"
              value={userInfo.userNickname}
              onChange={handleChange}
              className="border border-orange-400 rounded px-3 py-2 focus:outline-none"
              type="text"
              minLength={2}
              maxLength={20}
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm">전화번호</label>
            <input
              name="userPhone"
              value={userInfo.userPhone}
              onChange={handleChange}
              className="border border-orange-400 rounded px-3 py-2 focus:outline-none"
              type="tel"
              maxLength={13}
              required
            />
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white rounded hover:bg-orange-600 cursor-pointer"
            >
              수정하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyInfo;
