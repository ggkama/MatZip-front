import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../api/apiService";

const PAGE_SIZE = 5;
const FOOD_CATEGORIES = ["전체", "한식", "중식", "양식", "일식"];
const SEOUL_GU = [
  "강남구", "강동구", "강북구", "강서구",
  "관악구", "광진구", "구로구", "금천구",
  "노원구", "도봉구", "동대문구", "동작구",
  "마포구", "서대문구", "서초구", "성동구",
  "성북구", "송파구", "양천구", "영등포구",
  "용산구", "은평구", "종로구", "중구", "중랑구"
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
  const filteredStores = allStores.filter(store => {
    const foodCond = foodType === "전체" || store.categoryFoodtype === foodType;
    const addressCond = address === "전체" || store.categoryAddress === address;
    return foodCond && addressCond;
  });

  // 페이지네이션
  const totalPages = Math.max(1, Math.ceil(filteredStores.length / PAGE_SIZE));
  const pageStores = filteredStores.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

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
    <div className="bg-[#f4f4f4] min-h-[calc(100vh-180px)] py-10">
      <div className="max-w-4xl mx-auto">

        {/* 음식 카테고리 버튼 */}
        <div className="flex justify-center gap-4 mb-6">
          {FOOD_CATEGORIES.map((type) => (
            <button
              key={type}
              onClick={() => handleCategoryClick(type)}
              className={`px-6 py-2 rounded-full font-semibold text-base border-2 transition
                ${foodType === type
                  ? "bg-orange-400 border-orange-400 text-white"
                  : "bg-white border-orange-200 text-orange-500 hover:bg-orange-100"}
              `}
            >
              {type}
            </button>
          ))}
        </div>

        {/* 행정구 드롭다운 */}
        <div className="flex justify-center mb-10 relative">
          <div ref={dropdownRef}>
            <button
              className="px-7 py-2 rounded-full font-semibold text-base border-2 border-orange-300 bg-white text-orange-500 flex items-center gap-1 shadow-sm hover:bg-orange-50 transition"
              onClick={() => setShowDropdown((prev) => !prev)}
              type="button"
            >
              {address === "전체" ? "행정구 선택하기" : address}
              <svg
                className={`w-5 h-5 ml-2 transition-transform ${showDropdown ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showDropdown && (
              <div
                className="absolute left-1/2 -translate-x-1/2 z-20 mt-2 w-[440px] bg-white border border-orange-200 rounded-xl shadow-lg p-4"
                style={{ minWidth: 300 }}
              >
                <div className="mb-3 flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => handleDistrictClick("전체")}
                    className={`px-5 py-2 rounded-full font-medium border transition
                      ${address === "전체"
                        ? "bg-orange-400 text-white border-orange-400"
                        : "bg-white text-orange-500 border-orange-200 hover:bg-orange-100"}
                    `}
                  >
                    전체
                  </button>
                </div>
                {districtRows.map((row, idx) => (
                  <div key={idx} className="flex gap-2 mb-2 justify-center">
                    {row.map((district) => (
                      <button
                        key={district}
                        onClick={() => handleDistrictClick(district)}
                        className={`px-5 py-2 rounded-full font-medium border transition
                          ${address === district
                            ? "bg-orange-400 text-white border-orange-400"
                            : "bg-white text-orange-500 border-orange-200 hover:bg-orange-100"}
                        `}
                      >
                        {district}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 리스트 */}
        {pageStores.map((store) => (
          <div
            key={store.storeNo}
            className="mb-8 bg-[#FFBF70]/60 rounded-lg px-6 py-6 drop-shadow border border-orange-100 cursor-pointer hover:bg-[#ffe1b0] transition"
            onClick={() => navi(`/store-detail/${store.storeNo}`)}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-lg">{store.storeName}</span>
              <span className="text-xs text-gray-600">
                {store.storeAddress1} {store.storeAddress2}
              </span>
            </div>
            <div className="flex items-center mb-2 text-sm gap-3">
              <span className="font-semibold text-[#F2994A]">
                [{store.categoryAddress}]
              </span>
              <span className="text-gray-700">{store.categoryFoodtype}</span>
            </div>
            <div className="flex gap-4 mb-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-44 h-28 bg-[#E5E5E5] rounded flex items-center justify-center overflow-hidden"
                >
                  {store.imageList && store.imageList[i] ? (
                    <img
                      src={`${store.imageList[i]}`}
                      alt={`가게사진${i + 1}`}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  ) : (
                    <span className="text-gray-400">사진{i + 1}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 페이지네이션 */}
        <div className="flex justify-center my-8 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-7 h-7 rounded-full border-2 border-orange-300 flex items-center justify-center text-sm
                ${
                  currentPage === i + 1
                    ? "bg-orange-400 text-white border-orange-400"
                    : "bg-white text-orange-500"
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
