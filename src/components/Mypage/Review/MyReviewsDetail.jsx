import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../../api/apiService";

const MyReviewsDetail = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiService
    .get(`/api/review/myreview/detail/${reviewNo}`)
      .then((res) => {
        if (res.data.success) {
          setReviews(res.data.data); 
        }
      })
      .catch((err) => {
        console.error("내 리뷰 불러오기 실패", err);
      });
  }, []);

  if (!reviews.length) {
    return <div className="text-center mt-10">작성한 리뷰가 없습니다.</div>;
  }

  return (
    <div className="py-12 max-w-4xl mx-auto">
      <h2 className="text-center text-2xl font-semibold mb-12">내 리뷰 내역</h2>

      {reviews.map((review, idx) => (
        <div key={idx} className="border rounded-md p-8 mb-10">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold">{review.storeName}</h3>
            <span className="text-sm text-gray-500">
              {formatDate(review.createDate)}
            </span>
          </div>

          <div className="text-sm text-gray-700 font-semibold mb-4">
            {review.grade}점
          </div>

          <p className="text-sm text-gray-800 mb-4">{review.content}</p>

          {review.reviewImageList?.length > 0 && (
            <div className="flex gap-4">
              {review.reviewImageList.slice(0, 3).map((img, i) => (
                <img
                  key={i}
                  src={img.reviewImageUrl}
                  alt={`리뷰 이미지 ${i + 1}`}
                  className="w-[100px] h-[100px] object-cover rounded bg-gray-200"
                />
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="text-center mt-8">
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded"
        >
          목록
        </button>
      </div>
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

export default MyReviewsDetail;
