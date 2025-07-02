import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "./styledComponents/util/FormInput";
import FormSelect from "./styledComponents/util/FormSelect";
import ConvenienceSelector from "./styledComponents/util/ConvenienceSelector";
import DayCheckboxGroup from "./styledComponents/util/DayCheckboxGroup";
import HolidayPicker from "./styledComponents/util/HolidayPicker";
import ImageUploader from "./styledComponents/util/ImageUploader";
import SubmitButton from "./styledComponents/util/SubmitButton";
import convenienceOptions from "./styledComponents/js/convenienceOptions";
import {
  formatPhoneNumber,
  isValidPhoneNumber,
} from "./styledComponents/js/phone";
import axios from "axios";

const RegisterStoreForm = ({ initialData = null }) => {
  const navigate = useNavigate();
  const isEdit = !!initialData;

  const [storeName, setStoreName] = useState(initialData?.storeName || "");
  const [categoryAddress, setCategoryAddress] = useState(
    initialData?.categoryAddress || ""
  );
  const [categoryFoodtype, setCategoryFoodtype] = useState(
    initialData?.categoryFoodtype || ""
  );
  const [categoryConvenience, setCategoryConvenience] = useState(
    Array.isArray(initialData?.categoryConvenience)
      ? initialData.categoryConvenience.map((s) => s.trim())
      : []
  );
  const [storePhone, setStorePhone] = useState(initialData?.storePhone || "");
  const [storeAddress1, setStoreAddress1] = useState(
    initialData?.storeAddress1 || ""
  );
  const [storeAddress2, setStoreAddress2] = useState(
    initialData?.storeAddress2 || ""
  );
  const [openTime, setOpenTime] = useState(initialData?.openTime || "");
  const [closeTime, setCloseTime] = useState(initialData?.closeTime || "");
  const [dayOff, setDayOff] = useState(initialData?.dayOff || []);
  const [startDate, setStartDate] = useState(initialData?.startDate || null);
  const [endDate, setEndDate] = useState(initialData?.endDate || null);
  const [images, setImages] = useState([]);
  const [deletedImagePaths, setDeletedImagePaths] = useState([]);
  const [menuName, setMenuName] = useState(
    initialData?.menuList?.join(", ") || ""
  );
  const [menuList, setMenuList] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [count, setCount] = useState(initialData?.count || "");
  const [imageList, setImageList] = useState(initialData?.imageList || []);

  const dayOptions = ["월", "화", "수", "목", "금", "토", "일"];

  useEffect(() => {
    const items =
      typeof menuName === "string"
        ? menuName
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [];
    setMenuList(items);
  }, [menuName]);

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
    if (!isValidPhoneNumber(storePhone)) {
      setError("전화번호 형식을 확인해주세요. 예: 02-1234-5678");
      return false;
    }
    const timeRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(openTime) || !timeRegex.test(closeTime)) {
      setError("영업시간은 HH:mm 형식으로 입력해주세요.");
      return false;
    }
    if (!count || count <= 0) {
      setError("시간당 수용 인원을 입력해주세요.");
      return false;
    }
    if (!isEdit && (images.length < 1 || images.length > 5)) {
      setError("이미지는 최소 1장 이상, 최대 5장까지 등록 가능합니다.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const storeDto = {
      storeNo: initialData?.storeNo || null,
      storeName,
      categoryAddress,
      categoryFoodtype,
      storePhone,
      storeAddress1,
      storeAddress2,
      openTime,
      closeTime,
      menuList,
      categoryConvenience,
      dayOff,
      startDate,
      endDate,
      count,
      imageList, // 추가됨
    };

    const formData = new FormData();
    formData.append(
      "storeDto",
      new Blob([JSON.stringify(storeDto)], { type: "application/json" })
    );
    images.forEach((img) => formData.append("images", img));
    deletedImagePaths.forEach((path) =>
      formData.append("deletedImagePaths", path)
    );

    const rawTokens = sessionStorage.getItem("tokens");
    const accessToken = rawTokens ? JSON.parse(rawTokens).accessToken : null;

    try {
      if (isEdit) {
        await axios.put(
          "http://localhost:8080/api/owner/stores/update",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        alert("수정이 완료되었습니다.");
      } else {
        await axios.post(
          "http://localhost:8080/api/owner/stores/write",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        alert("등록이 완료되었습니다.");
      }

      setSuccess(true);
      setError(null);
      navigate("/owner-page", { replace: true });
      window.location.reload();
    } catch (err) {
      setError("저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="pt-10 pb-20">
      <h2 className="text-3xl font-bold mb-8 text-center">
        {isEdit ? "가게 정보 수정" : "가게 정보 등록"}
      </h2>
      <div className="space-y-4 flex flex-col w-[500px] mx-auto">
        <span className="text-sm text-gray-500">* 표시는 필수입니다.</span>

        <FormInput label="매장명" value={storeName} onChange={setStoreName} />
        <FormSelect
          label="지역"
          value={categoryAddress}
          onChange={setCategoryAddress}
          options={["서울특별시 강남구", "서울특별시 중구"]}
        />
        <FormSelect
          label="음식 종류"
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
          label="전화번호"
          value={storePhone}
          onChange={(e) => setStorePhone(formatPhoneNumber(e))}
          placeholder="예: 010-1234-5678"
        />
        <FormInput
          label="주소"
          value={storeAddress1}
          onChange={setStoreAddress1}
        />
        <FormInput
          label="상세 주소"
          value={storeAddress2}
          onChange={setStoreAddress2}
        />
        <FormInput
          label="영업 시작 시간"
          type="time"
          value={openTime}
          onChange={setOpenTime}
        />
        <FormInput
          label="영업 종료 시간"
          type="time"
          value={closeTime}
          onChange={setCloseTime}
        />
        <DayCheckboxGroup
          options={dayOptions}
          selected={dayOff}
          toggle={handleDayToggle}
        />
        <div className="flex flex-col">
          <label className="font-bold mb-2">임시휴무일 (선택)</label>
          <HolidayPicker
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </div>
        <FormInput
          label="대표 메뉴"
          value={menuName}
          onChange={setMenuName}
          placeholder="예: 김치찌개, 제육볶음, 된장찌개"
        />
        <FormInput
          label="시간당 수용 인원 (명)"
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e))}
          placeholder="예: 100"
        />
        <ImageUploader
          images={images}
          setImages={setImages}
          setError={setError}
          deletedImagePaths={deletedImagePaths}
          setDeletedImagePaths={setDeletedImagePaths}
          initialImages={
            Array.isArray(initialData?.imageList) ? initialData.imageList : []
          }
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm">
            {isEdit ? "수정이 완료되었습니다." : "등록이 완료되었습니다."}
          </p>
        )}

        <SubmitButton onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default RegisterStoreForm;
