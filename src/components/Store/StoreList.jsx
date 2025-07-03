import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../api/apiService"; // 실제 경로에 맞게

const PAGE_SIZE = 5;

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // 데이터 조회
  useEffect(() => {
    apiService
      .get("/api/store/list", {
        params: {
          page: currentPage - 1,
          size: PAGE_SIZE,
          search: search.trim()
        }
      })
      .then((res) => {
        console.log("받아온 매장 데이터 전체:", res.data); 
        setStores(res.data.content ?? []);
        setTotalPages(res.data.totalPages ?? 1);
      })
      .catch(() => {
        setStores([]);
        setTotalPages(1);
      });
  }, [currentPage, search]);

  // 검색 버튼
  const handleSearch = () => {
    setCurrentPage(1); // 검색 시 첫페이지부터
  };

  return (
    <div className="bg-[#f4f4f4] min-h-[calc(100vh-180px)] py-10">
      <div className="max-w-4xl mx-auto">
        {/* 리스트 */}
        {stores.map((store) => (
          <div
            key={store.storeNo}
            className="mb-8 bg-[#FFBF70]/60 rounded-lg px-6 py-6 drop-shadow border border-orange-100 cursor-pointer hover:bg-[#ffe1b0] transition"
            onClick={() => navigate(`/store-detail/${store.storeNo}`)}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-lg">{store.storeName}</span>
              <span className="text-xs text-gray-600">
                {store.storeAddress1} {store.storeAddress2}
              </span>
            </div>
            {/* 카테고리/음식 */}
            <div className="flex items-center mb-2 text-sm gap-3">
              <span className="font-semibold text-[#F2994A]">[{store.categoryAddress}]</span>
              <span className="text-gray-700">{store.categoryFoodtype}</span>
            </div>
            {/* 이미지 3칸 고정 */}
            <div className="flex gap-4 mb-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-44 h-28 bg-[#E5E5E5] rounded flex items-center justify-center overflow-hidden"
                >
                  {store.imageList && store.imageList[i] ? (
                    <img
                      src={`http://localhost:8080${store.imageList[i]}`}
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
            {/* 카테고리/음식 태그 영역 - 원하면 아래처럼 남길 수도 있음 */}
            {/* 
            <div className="flex gap-2">
              <span className="bg-orange-100 text-orange-900 px-4 py-1 text-sm rounded font-semibold">
                  {store.categoryAddress}
              </span>
              <span className="bg-orange-200 text-orange-800 px-4 py-1 text-sm rounded font-semibold">
                  {store.categoryFoodtype}
              </span>
            </div>
            */}
          </div>
        ))}

        {/* 페이지네이션 */}
        <div className="flex justify-center my-8 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-7 h-7 rounded-full border-2 border-orange-300 flex items-center justify-center text-sm
                ${currentPage === i + 1 ? "bg-orange-400 text-white border-orange-400" : "bg-white text-orange-500"}
              `}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* 검색/필터 */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <input
            type="text"
            placeholder="가게명 검색"
            className="border border-gray-300 rounded px-3 py-1 w-60 focus:outline-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
          />

          {/* 버튼클릭해서 검색? */}
          {/* <button
            className="bg-orange-300 px-4 py-1 rounded text-white font-semibold hover:bg-orange-400"
            onClick={handleSearch}
          >
            검색
          </button> */}
        </div>
        <div className="flex justify-center gap-4 mb-4">
          <button className="bg-white border border-gray-300 px-4 py-1 rounded-full text-sm flex items-center">
            foodType <span className="ml-2">⏷</span>
          </button>
          <button className="bg-white border border-gray-300 px-4 py-1 rounded-full text-sm flex items-center">
            지역 <span className="ml-2">⏷</span>
          </button>
          <button className="bg-white border border-gray-300 px-4 py-1 rounded-full text-sm flex items-center">
            편의시설 <span className="ml-2">⏷</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreList;
