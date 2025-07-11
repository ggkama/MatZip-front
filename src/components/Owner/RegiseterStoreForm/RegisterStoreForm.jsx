import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

// 유틸 함수
import {
  formatPhoneNumber,
  isValidPhoneNumber,
} from "./styledComponents/js/phone";

// 섹션 컴포넌트
import SubmitButton from "./styledComponents/util/SubmitButton";
import StoreNameSection from "./styledComponents/parts/StoreNameSection";
import AddressSection from "./styledComponents/parts/AddressSection";
import FoodtypeSection from "./styledComponents/parts/FoodtypeSection";
import ConvenienceSection from "./styledComponents/parts/ConvenienceSection";
import PhoneSection from "./styledComponents/parts/PhoneSection";
import TimeSection from "./styledComponents/parts/TimeSection";
import HolidaySection from "./styledComponents/parts/HolidaySection";
import MenuSection from "./styledComponents/parts/MenuSection";
import CapacitySection from "./styledComponents/parts/CapacitySection";
import ImageSection from "./styledComponents/parts/ImageSection";
import RegionSection from "./styledComponents/parts/RegionSection";

const RegisterStoreForm = () => {
  const navi = useNavigate();
  const location = useLocation();
  const initialData = location.state?.initialData || null;
  const isEdit = !!initialData;

  // 상태값
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
  const [storePhone, setStorePhone] = useState(
    initialData?.storePhone ? formatPhoneNumber(initialData.storePhone) : ""
  );
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
  const [menuName, setMenuName] = useState(
    initialData?.menuList?.join(", ") || ""
  );
  const [menuList, setMenuList] = useState([]);
  const [count, setCount] = useState(initialData?.count || "");

  const [images, setImages] = useState([]); // 새로 추가된 이미지
  const [imageList, setImageList] = useState(initialData?.imageList || []); // 기존 이미지
  const [deletedImagePaths, setDeletedImagePaths] = useState([]); // 삭제된 기존 이미지
  const [changedImages, setChangedImages] = useState([]); // 교체된 이미지 old-new 쌍

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // 메뉴 문자열 → 배열 변환
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

  // 편의시설 토글 핸들러
  const handleConvenienceToggle = (value) => {
    setCategoryConvenience((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // 정기휴무일 토글 핸들러
  const handleDayToggle = (value) => {
    setDayOff((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // 유효성 검사
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

  // 제출 처리
  const handleSubmit = () => {
    if (!validate()) return;

    const filteredImageList = imageList.filter(
      (path) => !deletedImagePaths.includes(path)
    );

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
      imageList: filteredImageList,
    };

    const formData = new FormData();
    formData.append(
      "storeDto",
      new Blob([JSON.stringify(storeDto)], { type: "application/json" })
    );
    formData.append(
      "deletedImagePaths",
      new Blob([JSON.stringify(deletedImagePaths)], {
        type: "application/json",
      })
    );

    changedImages.forEach(({ oldImage, newImage }) => {
      formData.append("changedOldImages", oldImage);
      formData.append("changedNewImages", newImage);
    });

    images.forEach((image) => {
      if (image instanceof File && image.size > 0) {
        formData.append("images", image);
      }
    });

    const request = isEdit
      ? axiosInstance.put("/api/owner/stores/update", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      : axiosInstance.post("/api/owner/stores/write", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

    request
      .then(() => {
        setSuccess(true);
        setError(null);
        alert(isEdit ? "수정이 완료되었습니다." : "등록이 완료되었습니다.");
        navi("/owner-page");
      })
      .catch(() => {
        setError("저장에 실패했습니다. 다시 시도해주세요.");
      });
  };

  // 렌더링
  return (
    <div className="pt-10 pb-20">
      <h2 className="text-3xl font-bold mb-8 text-center">
        {isEdit ? "가게 정보 수정" : "가게 정보 등록"}
      </h2>

      <div className="space-y-4 flex flex-col w-[500px] mx-auto">
        <span className="text-sm text-gray-500">* 표시는 필수입니다.</span>

        <StoreNameSection storeName={storeName} setStoreName={setStoreName} />
        <RegionSection
          categoryAddress={categoryAddress}
          setCategoryAddress={setCategoryAddress}
        />
        <FoodtypeSection
          categoryAddress={categoryAddress}
          setCategoryAddress={setCategoryAddress}
          categoryFoodtype={categoryFoodtype}
          setCategoryFoodtype={setCategoryFoodtype}
        />
        <ConvenienceSection
          categoryConvenience={categoryConvenience}
          handleToggle={handleConvenienceToggle}
        />
        <PhoneSection storePhone={storePhone} setStorePhone={setStorePhone} />
        <AddressSection
          storeAddress1={storeAddress1}
          setStoreAddress1={setStoreAddress1}
          storeAddress2={storeAddress2}
          setStoreAddress2={setStoreAddress2}
        />
        <TimeSection
          openTime={openTime}
          setOpenTime={setOpenTime}
          closeTime={closeTime}
          setCloseTime={setCloseTime}
        />
        <HolidaySection
          dayOff={dayOff}
          handleDayToggle={handleDayToggle}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <MenuSection menuName={menuName} setMenuName={setMenuName} />
        <CapacitySection count={count} setCount={setCount} />
        <ImageSection
          isEdit={isEdit}
          images={images}
          setImages={setImages}
          setError={setError}
          deletedImagePaths={deletedImagePaths}
          setDeletedImagePaths={setDeletedImagePaths}
          initialImages={
            Array.isArray(initialData?.imageList) ? initialData.imageList : []
          }
          changedImages={changedImages}
          setChangedImages={setChangedImages}
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
