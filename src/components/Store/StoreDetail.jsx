import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiService } from "../../api/apiService";
import convenienceOptions from "../Owner/RegiseterStoreForm/styledComponents/js/convenienceOptions";
import BlogSection from "./BlogSection/BlogSection";
import StoreReviewList from "./StoreReviewList";

const convenienceKeyToLabel = (key) => {
  const found = convenienceOptions.find((opt) => opt.key === key);
  return found ? found.label : key;
};

const StoreDetail = () => {
  const { storeNo } = useParams();
  const navi = useNavigate();
  const [store, setStore] = useState(null);

  useEffect(() => {
    apiService
      .get(`/api/store/detail/${storeNo}`)
      .then((res) => {
        console.log("가게 상세 데이터 응답:", res.data);
        setStore(res.data);
      });
  }, [storeNo]);

  
  const handleReservationClick = () => {
    const raw = sessionStorage.getItem("tokens")
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
    <div className="max-w-4xl mx-auto py-8 px-2">
      {/* 상단: 가게명 */}
      <h2 className="text-2xl font-bold mb-4">{store.storeName}</h2>

      {/* 상단: 대표 이미지/정보 */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {/* 이미지 */}
        <div className="flex-1 flex justify-center items-center">
          <div className="w-[330px] h-[260px] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
            {store.imageList && store.imageList.length > 0 ? (
              <img
                src={`http://localhost:8080${store.imageList[0]}`}
                alt="대표사진"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-lg">대표사진</span>
            )}
          </div>
        </div>
        {/* 정보 */}
        <div className="flex-1 flex flex-col gap-4 justify-center text-base">
          <div className="flex items-center gap-2">
            <span className="text-orange-500"><i className="ri-map-pin-2-fill" /></span>
            <span>{store.storeAddress1} {store.storeAddress2}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-500"><i className="ri-star-s-fill" /></span>
            <span>{store.star}점</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-500"><i className="ri-phone-fill" /></span>
            <span>{store.storePhone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-500"><i className="ri-time-fill" /></span>
            <span>
              {store.openTime} - {store.closeTime}
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="bg-orange-100 text-orange-900 px-2 py-1 rounded-full text-xs">{store.categoryAddress}</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">{store.categoryFoodtype}</span>
            {/* 편의시설(라벨 변환) */}
            {store.categoryConvenience &&
              store.categoryConvenience.map((conv, idx) => (
                <span
                  key={idx}
                  className="bg-orange-200 text-orange-800 px-2 py-1 rounded-full text-xs"
                >
                  {/* 편의시설 함수호출입니당 */}
                  {convenienceKeyToLabel(conv)}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* 메뉴 */}
      <div className="mb-8">
        <div className="font-semibold mb-2">메뉴정보</div>
        <div className="flex gap-3 flex-wrap">
          {store.menuList && store.menuList.length > 0 ? (
            store.menuList.map((menu, idx) => (
              <span
                key={idx}
                className="bg-orange-200 text-orange-800 px-4 py-1 rounded-full text-sm"
              >
                {menu}
              </span>
            ))
          ) : (
            <span className="text-gray-400">등록된 메뉴 없음</span>
          )}
        </div>
      </div>

      {/* 방문자 리뷰 */}
      <div className="mb-8">
        <div className="font-semibold mb-2">방문자 리뷰</div>
        {<StoreReviewList storeNo={store.storeNo} />}
      </div>

      <div className="mb-12">
        <div className="font-semibold mb-2">블로그 리뷰</div>
          {store.storeName && <BlogSection storeName={store.storeName} />}
      </div>

      {/* 예약 버튼 */}
      <div className="flex justify-center mb-12">
        <button 
        onClick={handleReservationClick}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-2 rounded-xl shadow">
          예약하기
        </button>
      </div>
    </div>
  );
};

export default StoreDetail;