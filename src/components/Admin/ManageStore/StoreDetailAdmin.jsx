import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SubmitButton from "../../Owner/RegiseterStoreForm/styledComponents/util/SubmitButton";
import {
  formatPhoneNumber,
  isValidPhoneNumber,
} from "../../Owner/RegiseterStoreForm/styledComponents/js/phone";

import StoreNameSection from "../../Owner/RegiseterStoreForm/styledComponents/parts/StoreNameSection";
import AddressSection from "../../Owner/RegiseterStoreForm/styledComponents/parts/AddressSection";
import FoodtypeSection from "../../Owner/RegiseterStoreForm/styledComponents/parts/FoodtypeSection";
import ConvenienceSection from "../../Owner/RegiseterStoreForm/styledComponents/parts/ConvenienceSection";
import PhoneSection from "../../Owner/RegiseterStoreForm/styledComponents/parts/PhoneSection";
import TimeSection from "../../Owner/RegiseterStoreForm/styledComponents/parts/TimeSection";
import HolidaySection from "../../Owner/RegiseterStoreForm/styledComponents/parts/HolidaySection";
import MenuSection from "../../Owner/RegiseterStoreForm/styledComponents/parts/MenuSection";
import CapacitySection from "../../Owner/RegiseterStoreForm/styledComponents/parts/CapacitySection";
import ImageSection from "../../Owner/RegiseterStoreForm/styledComponents/parts/ImageSection";
import RegionSection from "../../Owner/RegiseterStoreForm/styledComponents/parts/RegionSection";
import axiosInstance from "../../../api/axiosInstance";

const StoreDetailAdmin = () => {
  const navi = useNavigate();
  const { storeNo } = useParams();

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
  const [deletedImagePaths, setDeletedImagePaths] = useState([]);
  const [menuName, setMenuName] = useState("");
  const [menuList, setMenuList] = useState([]);
  const [count, setCount] = useState("");
  const [imageList, setImageList] = useState([]);
  const [changedImages, setChangedImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/api/admin/manage/stores/detail/${storeNo}`)
      .then((res) => {
        const data = res.data;
        setStoreName(data.storeName);
        setCategoryAddress(data.categoryAddress);
        setCategoryFoodtype(data.categoryFoodtype);
        setCategoryConvenience(data.categoryConvenience);
        setStorePhone(formatPhoneNumber(data.storePhone || ""));
        setStoreAddress1(data.storeAddress1);
        setStoreAddress2(data.storeAddress2);
        setOpenTime(data.openTime);
        setCloseTime(data.closeTime);
        setDayOff(data.dayOff);
        setStartDate(data.startDate);
        setEndDate(data.endDate);
        setMenuName(data.menuList?.join(", ") || "");
        setCount(data.count);
        setImageList(data.imageList || []);
      });
  }, [storeNo]);

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

  const handleEdit = () => {
    if (!window.confirm("수정하시겠습니까?")) return;

    const formData = new FormData();
    const fields = {
      storeNo,
      storeName,
      categoryAddress,
      categoryFoodtype,
      storePhone,
      storeAddress1,
      storeAddress2,
      openTime,
      closeTime,
      count,
      startDate,
      endDate,
    };

    Object.entries(fields).forEach(([key, value]) =>
      formData.append(key, value)
    );

    menuList.forEach((menu) => formData.append("menuList", menu));
    dayOff.forEach((day) => formData.append("dayOff", day));
    categoryConvenience.forEach((item) =>
      formData.append("categoryConvenience", item)
    );
    images.forEach((file) => formData.append("images", file));
    deletedImagePaths.forEach((path) =>
      formData.append("deletedImagePaths", path)
    );
    changedImages.forEach(({ oldPath, newFile }) => {
      formData.append("changedOldImages", oldPath);
      formData.append("changedNewImages", newFile);
    });

    axiosInstance
      .put("/api/owner/stores/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert("수정이 완료되었습니다.");
        navi("/admin/store-list");
      })
      .catch((err) => {
        console.error(err);
        alert("수정 중 오류가 발생했습니다.");
      });
  };

  const handleDelete = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    axiosInstance
      .delete(`/api/admin/manage/stores/${storeNo}`)
      .then(() => {
        alert("삭제 완료");
        navi("/admin/store-list");
      })
      .catch(() => alert("삭제 실패"));
  };

  return (
    <div className="pt-10 pb-20">
      <h2 className="text-3xl font-bold mb-8 text-center">
        가게 상세 정보 (관리자)
      </h2>
      <div className="space-y-4 flex flex-col w-[500px] mx-auto">
        <StoreNameSection
          storeName={storeName}
          setStoreName={setStoreName}
          disabled
        />
        <RegionSection
          categoryAddress={categoryAddress}
          setCategoryAddress={setCategoryAddress}
          disabled
        />
        <FoodtypeSection
          categoryAddress={categoryAddress}
          setCategoryAddress={setCategoryAddress}
          categoryFoodtype={categoryFoodtype}
          setCategoryFoodtype={setCategoryFoodtype}
          disabled
        />
        <ConvenienceSection
          categoryConvenience={categoryConvenience}
          handleToggle={() => {}}
          disabled
        />
        <PhoneSection
          storePhone={storePhone}
          setStorePhone={setStorePhone}
          disabled
        />
        <AddressSection
          storeAddress1={storeAddress1}
          setStoreAddress1={setStoreAddress1}
          storeAddress2={storeAddress2}
          setStoreAddress2={setStoreAddress2}
          disabled
        />
        <TimeSection
          openTime={openTime}
          setOpenTime={setOpenTime}
          closeTime={closeTime}
          setCloseTime={setCloseTime}
          disabled
        />
        <HolidaySection
          dayOff={dayOff}
          handleDayToggle={() => {}}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          disabled
        />
        <MenuSection menuName={menuName} setMenuName={setMenuName} disabled />
        <CapacitySection count={count} setCount={setCount} disabled />
        <ImageSection
          images={images}
          setImages={setImages}
          setError={setError}
          deletedImagePaths={deletedImagePaths}
          setDeletedImagePaths={setDeletedImagePaths}
          initialImages={imageList}
          readOnly
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            수정하기
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreDetailAdmin;
