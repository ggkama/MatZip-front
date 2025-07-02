import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../../api/apiService";

const MyReviewsList = () => {
  const navi = useNavigate();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    apiService
      .get("/api/review/myreview")
      .then((res) => {
        console.log("내 리뷰 응답:", res.data);

        
        const list = res.data.content;
        if (Array.isArray(list)) {
          setReviews(list);
        } 
      })
      .catch((err) => {
        console.error("리뷰 불러오기 실패:", err);
        setReviews([]);
      });
  }, []);

  return (
    <div className="flex flex-col items-center pt-10 pb-20 px-4">
      <h2 className="text-3xl font-bold mb-6">내 리뷰 내역</h2>

      <table className="w-full border-t-2 border-black mt-5 text-sm text-center max-w-5xl">
        <thead>
          <tr className="font-semibold border-b border-black">
            <th className="py-3">날짜</th>
            <th className="py-3">리뷰 내용</th>
            <th className="py-3">가게명</th>
            <th className="py-3" width="80">점수</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? (
            reviews.map((review, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                onClick={() => navi("/my-review-detail", { state: { review } })}
              >
                <td className="py-3">{formatDate(review.createDate)}</td>
                <td
                  className="px-2 max-w-[300px] truncate"
                  title={review.reviewContent}
                >
                  {review.reviewContent}
                </td>
                <td>{review.storeName}</td>
                <td>{review.storeGrade}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-6 text-gray-500">
                리뷰가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}.${String(date.getDate()).padStart(2, "0")}`;
};

export default MyReviewsList;
