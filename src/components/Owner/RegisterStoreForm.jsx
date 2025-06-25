import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RegisterStoreForm = () => {
  const navigate = useNavigate();

  const [storeName, setStoreName] = useState("");
  const [categoryAddress, setCategoryAddress] = useState("");
  const [categoryFoodtype, setCategoryFoodtype] = useState("");
  const [categoryConvenience, setCategoryConvenience] = useState([]);
  const [storePhone, setStorePhone] = useState("");
  const [storeAddress1, setStoreAddress1] = useState("");
  const [storeAddress2, setStoreAddress2] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [dayOff, setDayOff] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [images, setImages] = useState([]);
  const [menu, setMenu] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const convenienceOptions = [
    "주차 가능",
    "반려동물 동반",
    "노키즈존",
    "와이파이",
  ];
  const dayOptions = ["월", "화", "수", "목", "금", "토", "일"];

  const handleConvenienceToggle = (value) => {
    setCategoryConvenience((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleDayToggle = (value) => {
    setDayOff((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const validate = () => {
    if (
      !storeName ||
      !categoryAddress ||
      !categoryFoodtype ||
      categoryConvenience.length === 0 ||
      !storePhone ||
      !storeAddress1 ||
      !storeAddress2 ||
      !openTime ||
      !closeTime
    ) {
      setError("모든 필수 항목을 입력해주세요.");
      return false;
    }
    const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    const timeRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;
    if (!phoneRegex.test(storePhone)) {
      setError("전화번호 형식을 확인해주세요. 예: 02-1234-5678");
      return false;
    }
    if (!timeRegex.test(openTime) || !timeRegex.test(closeTime)) {
      setError("영업시간은 HH:mm 형식으로 입력해주세요.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const formData = new FormData();
    formData.append("storeName", storeName);
    formData.append("categoryAddress", categoryAddress);
    formData.append("categoryFoodtype", categoryFoodtype);
    categoryConvenience.forEach((c) =>
      formData.append("categoryConvenience", c)
    );
    formData.append("storePhone", storePhone);
    formData.append("storeAddress1", storeAddress1);
    formData.append("storeAddress2", storeAddress2);
    formData.append("openTime", openTime);
    formData.append("closeTime", closeTime);
    dayOff.forEach((d) => formData.append("dayOff", d));
    formData.append("menu", menu);
    images.forEach((img) => formData.append("images", img));

    try {
      // 백엔드 연결 전: 헤더 없이 단순 POST (예: mock API 또는 console 로그)
      console.log("제출된 데이터:", Object.fromEntries(formData));
      setSuccess(true);
    } catch (err) {
      setError("등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="pt-10 pb-20">
      <h2 className="text-3xl font-bold mb-8 text-center">내 가게정보 등록</h2>
      <div className="space-y-4 flex flex-col w-[500px] mx-auto">
        <span className="text-sm text-gray-500">* 표시는 필수입니다.</span>

        <label htmlFor="storeName">매장명 *</label>
        <input
          id="storeName"
          type="text"
          placeholder="매장명"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <label htmlFor="categoryAddress">지역 *</label>
        <select
          id="categoryAddress"
          value={categoryAddress}
          onChange={(e) => setCategoryAddress(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">지역 선택</option>
          <option>서울특별시 강남구</option>
          <option>서울특별시 중구</option>
        </select>

        <label htmlFor="categoryFoodtype">음식 종류 *</label>
        <select
          id="categoryFoodtype"
          value={categoryFoodtype}
          onChange={(e) => setCategoryFoodtype(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">음식종류 선택</option>
          <option>한식</option>
          <option>양식</option>
          <option>중식</option>
          <option>일식</option>
        </select>

        <label>편의시설 *</label>
        <div className="flex gap-2 flex-wrap">
          {convenienceOptions.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => handleConvenienceToggle(item)}
              className={`px-4 py-2 rounded-full border ${
                categoryConvenience.includes(item)
                  ? "bg-orange-400 text-white border-orange-400"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <label htmlFor="storePhone">전화번호 *</label>
        <input
          id="storePhone"
          type="text"
          placeholder="예: 02-1234-5678"
          value={storePhone}
          onChange={(e) => setStorePhone(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <label htmlFor="storeAddress1">주소 *</label>
        <input
          id="storeAddress1"
          type="text"
          placeholder="주소"
          value={storeAddress1}
          onChange={(e) => setStoreAddress1(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <label htmlFor="storeAddress2">상세 주소 *</label>
        <input
          id="storeAddress2"
          type="text"
          placeholder="상세 주소"
          value={storeAddress2}
          onChange={(e) => setStoreAddress2(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <label htmlFor="openTime">영업 시작 시간 *</label>
        <input
          id="openTime"
          type="time"
          value={openTime}
          onChange={(e) => setOpenTime(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <label htmlFor="closeTime">영업 종료 시간 *</label>
        <input
          id="closeTime"
          type="time"
          value={closeTime}
          onChange={(e) => setCloseTime(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <label>휴무일 (중복 선택 가능)</label>
        <div className="flex gap-3 flex-wrap">
          {dayOptions.map((day) => (
            <label key={day} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={dayOff.includes(day)}
                onChange={() => handleDayToggle(day)}
              />
              <span className="text-sm">{day}</span>
            </label>
          ))}
        </div>

        <label className="font-medium">임시휴무일 *</label>
        <div className="flex gap-4 items-center">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy.MM.dd"
            placeholderText="시작일"
            className="border px-4 py-2 rounded-md w-[228px] border-gray-300  focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <span>~</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy.MM.dd"
            placeholderText="종료일"
            className="border px-4 py-2 rounded-md w-[228px] border-gray-300  focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <label htmlFor="menu">대표 메뉴</label>
        <input
          id="menu"
          type="text"
          placeholder="대표 메뉴"
          value={menu}
          onChange={(e) => setMenu(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <span>매장 이미지</span>
        <label
          htmlFor="images"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md cursor-pointer w-fit"
        >
          업로드
        </label>
        <input
          id="images"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            const selectedFiles = Array.from(e.target.files);
            const totalFiles = [...images, ...selectedFiles];

            if (totalFiles.length > 5) {
              setError("이미지는 최대 5장까지 등록 가능합니다.");
              return;
            }

            setImages(totalFiles);
            setError(null);
          }}
          className="hidden"
        />

        {images.length > 0 && (
          <div className="grid grid-cols-5 gap-2 mt-2">
            {images.map((file, index) => (
              <div
                key={index}
                className="relative border-gray-100 rounded overflow-hidden w-full aspect-square"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`미리보기 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...images];
                    updated.splice(index, 1);
                    setImages(updated);
                  }}
                  className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm">등록이 완료되었습니다.</p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md"
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default RegisterStoreForm;
