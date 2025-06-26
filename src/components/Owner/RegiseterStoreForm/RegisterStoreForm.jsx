import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "./styledComponents/FormInput";
import FormSelect from "./styledComponents/FormSelect";
import ConvenienceSelector from "./styledComponents/ConvenienceSelector";
import DayCheckboxGroup from "./styledComponents/DayCheckboxGroup";
import HolidayPicker from "./styledComponents/HolidayPicker";
import ImageUploader from "./styledComponents/ImageUploader";
import SubmitButton from "./styledComponents/SubmitButton";

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

  const handleSubmit = () => {
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

    console.log("제출된 데이터:", Object.fromEntries(formData));
    setSuccess(true);
  };

  return (
    <div className="pt-10 pb-20">
      <h2 className="text-3xl font-bold mb-8 text-center">내 가게정보 등록</h2>
      <div className="space-y-4 flex flex-col w-[500px] mx-auto">
        <span className="text-sm text-gray-500">* 표시는 필수입니다.</span>

        <FormInput label="매장명 *" value={storeName} onChange={setStoreName} />
        <FormSelect
          label="지역 *"
          value={categoryAddress}
          onChange={setCategoryAddress}
          options={["서울특별시 강남구", "서울특별시 중구"]}
        />
        <FormSelect
          label="음식 종류 *"
          value={categoryFoodtype}
          onChange={setCategoryFoodtype}
          options={["한식", "양식", "중식", "일식"]}
        />

        <ConvenienceSelector
          options={convenienceOptions}
          selected={categoryConvenience}
          toggle={handleConvenienceToggle}
        />

        <FormInput
          label="전화번호 *"
          value={storePhone}
          onChange={setStorePhone}
          placeholder="예: 02-1234-5678"
        />

        <FormInput
          label="주소 *"
          value={storeAddress1}
          onChange={setStoreAddress1}
        />
        <FormInput
          label="상세 주소 *"
          value={storeAddress2}
          onChange={setStoreAddress2}
        />

        <FormInput
          label="영업 시작 시간 *"
          type="time"
          value={openTime}
          onChange={setOpenTime}
        />
        <FormInput
          label="영업 종료 시간 *"
          type="time"
          value={closeTime}
          onChange={setCloseTime}
        />

        <DayCheckboxGroup
          options={dayOptions}
          selected={dayOff}
          toggle={handleDayToggle}
        />

        <label className="font-medium">임시휴무일 *</label>
        <HolidayPicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />

        <FormInput label="대표 메뉴" value={menu} onChange={setMenu} />
        <ImageUploader
          images={images}
          setImages={setImages}
          setError={setError}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm">등록이 완료되었습니다.</p>
        )}

        <SubmitButton onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default RegisterStoreForm;
