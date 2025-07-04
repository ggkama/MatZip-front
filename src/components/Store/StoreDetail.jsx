import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaStar, FaPhone, FaClock } from "react-icons/fa";
import testImg from "../../assets/img/005.jpg";

const StoreDetail = () => {
  const navi = useNavigate();

  const store = {
    storeNo: 1,
    name: "명동교자 본점",
    address: "서울특별시 중구 명동10길 29",
    floor: "4층",
    phone: "0507-1366-5348",
    time: "10:30 - 21:00",
    conveniences: ["배달 가능", "주차 가능"],
    menus: ["칼국수", "만두", "백김치", "공깃밥"],
  };

  const handleReserve = () => {
    navi(`/reservaion-form`);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-10 max-w-5xl mx-auto items-start pt-20 pb-10">
          {/* 좌측: 이미지 */}
          <div className="flex-shrink-0 w-[350px] h-[350px] bg-gray-200 rounded-xl overflow-hidden">
            <img
              src={testImg}
              alt="store"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 우측: 매장 정보 */}
          <div className="flex-grow">
            <h2 className="text-3xl font-bold mb-6">{store.name}</h2>

            <ul className="space-y-3 text-sm text-gray-800">
              <li className="flex items-center gap-2 text-[16px]">
                <FaMapMarkerAlt className="text-orange-500" />
                {store.address}
              </li>
              <li className="flex items-center gap-2 text-[16px]">
                <FaStar className="text-orange-500" />
                {store.floor}
              </li>
              <li className="flex items-center gap-2 text-[16px]">
                <FaPhone className="text-orange-500" />
                {store.phone}
              </li>
              <li className="flex items-center gap-2 text-[16px]">
                <FaClock className="text-orange-500" />
                {store.time}
              </li>
            </ul>
            {/* 태그 정보 */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full">
                {store.conveniences}
              </span>
            </div>
          </div>
        </div>

        {/* 리뷰/사진 영역은 생략 가능 */}

        <div className="mt-10 text-center">
          <button
            onClick={handleReserve}
            className="bg-orange-500 text-white px-6 py-3 rounded text-lg hover:bg-orange-600"
          >
            예약하기
          </button>
        </div>
      </div>
    </>
  );
};
export default StoreDetail;
