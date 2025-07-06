import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import Pagination from "../../Pagenation/Pagenation";

const StoreListAdmin = () => {
  const navi = useNavigate();
  const [stores, setStores] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const storeList = () => {
      axiosInstance
        .get(`/api/admin/manage/storeList?page=${currentPage}`)
        .then((response) => {
          setStores(response.data.storeList);
          setTotalPages(response.data.totalPages);
        })
        .catch((error) => {
          console.log(error);
          alert("가게 리스트 조회에 실패했습니다.");
        });
    };
    storeList();
  }, [currentPage]);

  return (
    <div className="flex flex-col items-center pt-10 pb-20 px-4">
      <div className="w-full max-w-6xl">
        <button
          onClick={() => navi("/admin")}
          className="mb-4 flex items-center text-orange-500 hover:underline"
        >
          <IoArrowBack className="mr-1" />
          뒤로가기
        </button>

        <h2 className="text-2xl font-bold text-center mb-5">가게 리스트</h2>

        <table className="w-full border-t-2 border-b-2 border-black text-sm text-center table-fixed">
          <thead>
            <tr className="border-b border-gray-500 font-semibold">
              <th className="py-3">가게이름</th>
              <th className="py-3">카테고리 주소</th>
              <th className="py-3">평점</th>
              <th className="py-3">가게 등록일</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr
                key={store.storeNo}
                className="border-b border-gray-300 hover:bg-gray-100"
                onClick={() => navi(`/admin/store/${store.storeNo}`)}
              >
                <td className="py-3">{store.storeName}</td>
                <td className="py-3">{store.categoryAddress}</td>
                <td className="py-3">⭐ {store.storeGrade}</td>
                <td className="py-3">{store.createDate.split("T")[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default StoreListAdmin;
