import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../api/apiService";

const PAGE_SIZE = 5;
const FOOD_CATEGORIES = ["전체", "한식", "중식", "양식", "일식"];
const SEOUL_GU = [
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "관악구",
  "광진구",
  "구로구",
  "금천구",
  "노원구",
  "도봉구",
  "동대문구",
  "동작구",
  "마포구",
  "서대문구",
  "서초구",
  "성동구",
  "성북구",
  "송파구",
  "양천구",
  "영등포구",
  "용산구",
  "은평구",
  "종로구",
  "중구",
  "중랑구",
];

function chunkArray(arr, chunkSize) {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}

const StoreList = () => {
  const [allStores, setAllStores] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [foodType, setFoodType] = useState("전체");
  const [address, setAddress] = useState("전체");
  const [showDropdown, setShowDropdown] = useState(false);

  const navi = useNavigate();
  const dropdownRef = useRef(null);

  // 드롭다운제외 암데나 누르면 사라짐
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [showDropdown]);

  // 데이터 전체 조회
  useEffect(() => {
    apiService

      .get("/api/store/list", { params: { search: search.trim() } })
      .then((res) => {
        setAllStores(res.data.content ?? []);
        setCurrentPage(1);
      })
      .catch(() => {
        setAllStores([]);
        setCurrentPage(1);
      });
  }, [search]);

  // 음식/행정구 필터링
  const filteredStores = allStores.filter((store) => {
    const foodCond = foodType === "전체" || store.categoryFoodtype === foodType;
    const addressCond = address === "전체" || store.categoryAddress === address;
    return foodCond && addressCond;
  });

  // 페이지네이션
  const totalPages = Math.max(1, Math.ceil(filteredStores.length / PAGE_SIZE));
  const pageStores = filteredStores.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // 음식 카테고리 클릭
  const handleCategoryClick = (type) => {
    setFoodType(type);
    setCurrentPage(1);
  };

  // 구 클릭
  const handleDistrictClick = (district) => {
    setAddress(district);
    setCurrentPage(1);
    setShowDropdown(false);
  };

  // 4개씩 구 나누기
  const districtRows = chunkArray(SEOUL_GU, 4);

  // 검색
  const handleSearch = () => setCurrentPage(1);

  return (
    <div className="min-h-[calc(100vh-180px)] py-10">
      <div className="">
        {/* 음식 카테고리 + 행정구 선택 묶음 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5">
          {/* 음식 카테고리 버튼 */}
          <div className="flex flex-wrap gap-3">
            {FOOD_CATEGORIES.map((type) => {
              const isActive = foodType === type;
              return (
                <button
                  key={type}
                  onClick={() => handleCategoryClick(type)}
                  className={`px-4 py-2 rounded-full font-semibold text-[14px] border-1 transition
            ${
              isActive
                ? "bg-[#FF6A3D] border-[#FF6A3D] text-white"
                : "bg-white  text-[#FF6A3D]"
            }`}
                >
                  {type}
                </button>
              );
            })}
          </div>

          {/* 행정구 드롭다운 */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowDropdown((prev) => !prev)}
              className="leading-[1] px-5 py-2 rounded-full font-bold text-sm bg-[#FF6A3D] text-white flex items-center gap-1 text-[14px] shadow-lg"
            >
              {address === "전체" ? "자치구 선택" : address}
              <svg
                className={`w-5 h-5 ml-2 transition-transform ${
                  showDropdown ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-[480px] bg-white border-gray-500 rounded-xl shadow-lg p-4 z-20">
                <div className="grid grid-cols-5 gap-2 justify-items-center">
                  {/* 전체 버튼 */}
                  <button
                    onClick={() => handleDistrictClick("전체")}
                    className={`px-4 py-3 w-[80px] rounded-full font-medium text-sm border transition
          ${
            address === "전체"
              ? "bg-[#FF6A3D] text-white border-[#FF6A3D]"
              : "bg-white text-[#FF6A3D] border-orange-200 hover:bg-orange-200"
          }`}
                  >
                    전체
                  </button>

                  {/* 나머지 구 리스트 */}
                  {districtRows.flat().map((district) => {
                    const isSelected = address === district;
                    return (
                      <button
                        key={district}
                        onClick={() => handleDistrictClick(district)}
                        className={`px-3 py-3 w-[80px] rounded-full font-medium text-sm border transition
              ${
                isSelected
                  ? "bg-[#FF6A3D] text-white border-[#FF6A3D]"
                  : "bg-white text-[#FF6A3D] border-[#FF6A3D] hover:bg-orange-100"
              }`}
                      >
                        {district}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 리스트 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pageStores.map((store) => (
            <div
              key={store.storeNo}
              className="bg-white rounded-xl shadow-xl transition cursor-pointer hover:opacity-65"
              onClick={() => navi(`/store-detail/${store.storeNo}`)}
            >
              {/* 썸네일 이미지 하나 */}
              <div className="w-full h-48 bg-gray-200 overflow-hidden rounded-t-xl">
                {store.imageList && store.imageList[0] ? (
                  <img
                    src={store.imageList[0]}
                    alt="썸네일"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                    이미지 없음
                  </div>
                )}
              </div>

              {/* 매장 정보 */}
              <div className="p-5 space-y-1 text-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {store.storeName}
                </h3>
                <p className="text-gray-600 mb-4 h-[20px] overflow-hidden text-ellipsis line-clamp-2 text-[14px]">
                  {store.storeAddress1} {store.storeAddress2}
                </p>
                <div className="flex gap-2 text-gray-700 items-center">
                  <span className="bg-gray-200 text-black px-3 py-1 rounded font-bold text-[14px]">
                    {store.categoryAddress}
                  </span>
                  <span className="leading-[1]">{store.categoryFoodtype}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* 페이지네이션 */}
        <div className="flex justify-center my-8 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-7 h-7 rounded-full border-1 border-[#FF6A3D] flex items-center justify-center text-sm
                ${
                  currentPage === i + 1
                    ? "bg-[#FF6A3D] text-white border-[#FF6A3D]"
                    : "bg-white text-[#FF6A3D]"
                }
              `}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* 검색 */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <input
            type="text"
            placeholder="가게명 검색"
            className="border border-gray-300 rounded px-3 py-1 w-60 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
      </div>
    </div>
  );
};

export default StoreList;
