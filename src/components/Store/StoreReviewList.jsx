import { useEffect, useState } from "react";
import { apiService } from "../../api/apiService";
import { FaStar } from "react-icons/fa";

// 최대 4장 이미지
function ReviewImages({ imageUrls }) {
  if (!imageUrls || imageUrls.length === 0) return null;

  return (
    <div className="flex gap-3 mb-2">
      {imageUrls.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`리뷰이미지${idx}`}
          className="w-32 h-32 rounded bg-gray-100 object-cover"
        />
      ))}
    </div>
  );
}
function StoreReviewList({ storeNo }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!storeNo) return;
    apiService
      .get(`/api/review/store/${storeNo}`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch(() => setReviews([]));
  }, [storeNo]);

  if (!reviews || reviews.length === 0) {
    return <div className="text-gray-400 py-8">리뷰가 아직 없습니다.</div>;
  }

  return (
    <section>
      {reviews.map((review, index) => (
        <div
          key={review.reviewNo}
          className={`py-6 ${
            index !== reviews.length - 1
              ? "bg-[#f1f1f1] px-8 rounded-sm mb-3"
              : "bg-[#f1f1f1] px-8 rounded-sm"
          }`}
        >
          {/* 유저 & 날짜 */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <span className="font-semibold">{review.userName}</span>
            </div>
            <div className="text-gray-400 text-sm">
              {review.createDate ? review.createDate.substring(0, 10) : ""}
            </div>
          </div>

          {/* 이미지가 존재할 경우에만 출력 */}
          {review.imageUrls && review.imageUrls.length > 0 && (
            <ReviewImages
              imageUrls={review.imageUrls}
              title={review.title || ""}
            />
          )}

          {/* 내용 */}
          <div className="text-sm mt-2 mb-3 whitespace-pre-line">
            {review.reviewContent}
          </div>

          {/* 별점 */}
          <div className="flex items-center text-[#FF6A3D] font-semibold gap-1 self-end">
            <FaStar size={16} />
            <span className="text-black">{review.storeGrade}점</span>
          </div>
        </div>
      ))}
    </section>
  );
}

export default StoreReviewList;
