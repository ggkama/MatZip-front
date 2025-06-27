import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "./styledComponents/FormInput";
import FormSelect from "./styledComponents/FormSelect";
import ConvenienceSelector from "./styledComponents/ConvenienceSelector";
import DayCheckboxGroup from "./styledComponents/DayCheckboxGroup";
import HolidayPicker from "./styledComponents/HolidayPicker";
import ImageUploader from "./styledComponents/ImageUploader";
import SubmitButton from "./styledComponents/SubmitButton";
import convenienceOptions from "./styledComponents/js/convenienceOptions";
import apiService from "../../../api/axiosInstance";
import axios from "axios";
import axiosInstance from "../../../api/axiosInstance";

const RegisterStoreForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem(
      "tokens",
      JSON.stringify({
        accessToken:
          "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4IiwidXNlcklkIjoic29samlucGFyazEyMjNAZ21haWwuY29tIiwidXNlclJvbGUiOiJST0xFX09XTkVSIiwiaWF0IjoxNzUxMDEwMjI0LCJleHAiOjE3NTEwMTc0MjR9.EUMvGhG47Hvmp1aoFF1-YscnaWH2A9mtF1JyF4ID2XUZRfnT3rmoTfhp5pqOITu70hazVsEeij5LDOEx1gz3EA",
      })
    );
    axiosInstance.get("/api/owner/stores").catch((err) => {});
  }, []);

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

    if (images.length < 1 || images.length > 5) {
      setError("이미지는 최소 1장 이상, 최대 5장까지 등록 가능합니다.");
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
    formData.append("storePhone", storePhone);
    formData.append("storeAddress1", storeAddress1);
    formData.append("storeAddress2", storeAddress2);
    formData.append("openTime", openTime);
    formData.append("closeTime", closeTime);
    formData.append("menu", menu);

    categoryConvenience.forEach((c) =>
      formData.append("categoryConvenience", c)
    );
    dayOff.forEach((d) => formData.append("dayOff", d));

    if (startDate) formData.append("startDate", startDate);
    if (endDate) formData.append("endDate", endDate);

    Array.from(images).forEach((img) => {
      formData.append("images", img);
    });

    const rawTokens = sessionStorage.getItem("tokens");
    const accessToken = rawTokens ? JSON.parse(rawTokens).accessToken : null;

    try {
      await axios.post("http://localhost:8080/api/owner/stores", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSuccess(true);
      setError(null);
      navigate("/my-store");
    } catch (err) {
      setError("등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="pt-10 pb-20">
      <h2 className="text-3xl font-bold mb-8 text-center">내 가게정보 등록</h2>
      <div className="space-y-4 flex flex-col w-[500px] mx-auto">
        <span className="text-sm text-gray-500">* 표시는 필수입니다.</span>

        <FormInput
          label="매장명 *"
          value={storeName}
          onChange={(e) => setStoreName(e)}
        />
        <FormSelect
          label="지역 *"
          value={categoryAddress}
          onChange={(e) => setCategoryAddress(e)}
          options={["서울특별시 강남구", "서울특별시 중구"]}
        />
        <FormSelect
          label="음식 종류 *"
          value={categoryFoodtype}
          onChange={(e) => setCategoryFoodtype(e)}
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
          onChange={(e) => setStorePhone(e)}
          placeholder="예: 02-1234-5678"
        />

        <FormInput
          label="주소 *"
          value={storeAddress1}
          onChange={(e) => setStoreAddress1(e)}
        />
        <FormInput
          label="상세 주소 *"
          value={storeAddress2}
          onChange={(e) => setStoreAddress2(e)}
        />

        <FormInput
          label="영업 시작 시간 *"
          type="time"
          value={openTime}
          onChange={(e) => setOpenTime(e)}
        />
        <FormInput
          label="영업 종료 시간 *"
          type="time"
          value={closeTime}
          onChange={(e) => setCloseTime(e)}
        />

        <DayCheckboxGroup
          options={dayOptions}
          selected={dayOff}
          toggle={handleDayToggle}
        />

        <label className="font-medium">임시휴무일 *</label>
        <HolidayPicker
          startDate={startDate}
          setStartDate={(e) => setStartDate(e)}
          endDate={endDate}
          setEndDate={(e) => setEndDate(e)}
        />

        <FormInput
          label="대표 메뉴"
          value={menu}
          onChange={(e) => setMenu(e)}
        />

        <ImageUploader
          images={images}
          setImages={(files) => setImages(files)}
          setError={(msg) => setError(msg)}
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
