import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import Pagination from "../../Pagenation/Pagenation";

const ReviewListAdmin = () => {
  const navi = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const reviewList = () => {
      axiosInstance
        .get(`/api/admin/manage/reviewList?page=${currentPage}`)
        .then((response) => {
          setReviews(response.data.reviewList);
          setTotalPages(response.data.totalPages);
          console.log(response.data.reviewList);
        })
        .catch((error) => {
          console.log(error);
          alert("가게 리스트 조회에 실패했습니다.");
        });
    };
    reviewList();
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

        <h2 className="text-2xl font-bold text-center mb-5">리뷰 리스트</h2>

        <table className="w-full border-t-2 border-b-2 border-black text-sm text-center table-fixed">
          <thead>
            <tr className="border-b border-gray-500 font-semibold">
              <th className="py-3">가게이름</th>
              <th className="py-3">작성자 이름</th>
              <th className="py-3">평점</th>
              <th className="py-3">리뷰 작성일</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr
                key={review.reviewNo}
                className="border-b border-gray-300 hover:bg-gray-100"
                onClick={() => navi(`/admin/review/${review.reviewNo}`)}
              >
                <td className="py-3">{review.storeName}</td>
                <td className="py-3">{review.userNickName}</td>
                <td className="py-3">⭐ {review.storeGrade}</td>
                <td className="py-3">{review.reviewDate.split("T")[0]}</td>
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

export default ReviewListAdmin;
