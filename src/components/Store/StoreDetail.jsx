import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiService } from "../../api/apiService";
import convenienceOptions from "../Owner/RegiseterStoreForm/styledComponents/js/convenienceOptions";
import BlogSection from "./BlogSection/BlogSection";
import StoreReviewList from "./StoreReviewList";
import {
  RiMapPin2Fill,
  RiStarSFill,
  RiPhoneFill,
  RiTimeFill,
} from "react-icons/ri";

const convenienceKeyToLabel = (key) => {
  const found = convenienceOptions.find((opt) => opt.key === key);
  return found ? found.label : key;
};

const StoreDetail = () => {
  const { storeNo } = useParams();
  const navi = useNavigate();
  const [store, setStore] = useState(null);

  useEffect(() => {
    apiService.get(`/api/store/detail/${storeNo}`).then((res) => {
      console.log("가게 상세 데이터 응답:", res.data);
      setStore(res.data);
    });
  }, [storeNo]);

  const handleReservationClick = () => {
    const raw = sessionStorage.getItem("tokens");
    if (!raw) {
      alert("로그인 후 예약할 수 있습니다.");
      navi("/login");
    } else {
      navi(`/reservation/${storeNo}`);
    }
  };

  if (!store) {
    return <div className="text-center py-20">storedetail 조회실패</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-15 px-2">
      {/* 상단: 가게명 */}

      {/* 상단: 대표 이미지/정보 */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {/* 이미지 */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="w-full h-[250px] border-1 border-gray-200 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
            {store.imageList && store.imageList.length > 0 ? (
              <img
                src={`${store.imageList[0]}`}
                alt="대표사진"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-lg">대표사진</span>
            )}
          </div>
        </div>

        {/* 정보 */}
        <div className="w-full md:w-1/2 flex flex-col gap-3 justify-center text-base">
          <h2 className="text-2xl font-bold">{store.storeName}</h2>
          <div className="flex items-center gap-2">
            <span className="text-[#FF6A3D]">
              <RiMapPin2Fill size={20} />
            </span>
            <span className="text-[16px] font-semibold">
              {store.storeAddress1} {store.storeAddress2}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#FF6A3D]">
              <RiStarSFill size={23} />
            </span>
            <span className="text-[16px] font-semibold">
              {store.star ? store.star : 5}점
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#FF6A3D] ">
              <RiPhoneFill size={20} />
            </span>
            <span className="text-[16px] font-semibold">
              {store.storePhone}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#FF6A3D]">
              <RiTimeFill size={20} />
            </span>
            <span className="text-[16px] font-semibold">
              {store.openTime} - {store.closeTime}
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="bg-[#FF6A3D] text-white px-4 py-1 rounded-full text-[14px] font-semibold">
              {store.categoryAddress}
            </span>
            <span className="bg-[#FF6A3D] text-white px-4 py-1 rounded-full text-[14px] font-semibold">
              {store.categoryFoodtype}
            </span>
            {store.categoryConvenience &&
              store.categoryConvenience.map((conv, idx) => (
                <span
                  key={idx}
                  className="bg-[#FF6A3D] text-white px-4 py-1 rounded-full text-[14px] font-semibold"
                >
                  {convenienceKeyToLabel(conv)}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* 메뉴 */}
      <div className="mb-8">
        <div className="font-bold mb-3 text-[16px]">메뉴정보</div>
        <div className="flex gap-3 flex-wrap">
          {store.menuList && store.menuList.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {store.menuList.map((menu, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#e1e1e1] rounded-full px-4 py-1.5 text-center text-sm font-medium text-"
                >
                  {menu}
                </div>
              ))}
            </div>
          ) : (
            <span className="text-gray-400">등록된 메뉴 없음</span>
          )}
        </div>
      </div>

      {/* 방문자 리뷰 */}
      <div className="mb-8">
        <div className="font-bold text-[16px] pb-3 ">방문자 리뷰</div>
        {<StoreReviewList storeNo={store.storeNo} />}
      </div>

      <div className="mb-12">
        <div className="font-bold text-[16px] mb-3">블로그 리뷰</div>
        {store.storeName && <BlogSection storeName={store.storeName} />}
      </div>

      {/* 예약 버튼 */}
      <div className="flex justify-center mb-12">
        <button
          onClick={handleReservationClick}
          className="bg-[#FF6A3D] text-white font-bold px-8 py-4 rounded-xl shadow"
        >
          예약하기
        </button>
      </div>
    </div>
  );
};

export default StoreDetail;
