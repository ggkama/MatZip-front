import { useEffect, useState } from "react";
import { apiService } from "../../api/apiService";
import { FaStar } from "react-icons/fa";

// 최대 4장 이미지 
function ReviewImages({ imageUrls, title }) {

  const images = imageUrls && imageUrls.length > 0 ? imageUrls : [];
  const padded = [...images];
  while (padded.length < 4) padded.push(null);

  return (
    <div className="flex gap-3 mb-2">
      {padded.map((img, idx) =>
        img ? (
          <img
            key={idx}
            src={`${img}`}
            alt={`리뷰이미지${idx}`}
            className="w-32 h-32 rounded bg-gray-100 object-cover"
          />
        ) : (
          <div
            key={idx}
            className="w-32 h-32 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-400"
          >
            {idx === 0 && title ? title : ""}
          </div>
        )
      )}
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
      console.log("스토어 리뷰 응답:", res.data); 
      setReviews(res.data);
    })
    .catch(() => setReviews([]));
}, [storeNo]);


  if (!reviews || reviews.length === 0) {
    return <div className="text-gray-400 py-8">리뷰가 아직 없습니다.</div>;
  }

  return (
    <section>
      <h3 className="font-bold text-lg mb-4">방문자 리뷰</h3>
      {reviews.map((review) => (
        <div key={review.reviewNo} className="bg-white p-6 rounded-lg shadow mb-8">
          {/* 유저 & 날짜 */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              
              <span className="font-semibold">{review.userName}</span>
            </div>
            <div className="text-gray-400 text-sm">
              {review.createDate ? review.createDate.substring(0, 10) : ""}
            </div>
          </div>
          {/* 이미지 4칸 (빈칸은 플홀) */}
          <ReviewImages imageUrls={review.imageUrls} title={review.title || "이미지가 없습니다"} />
          {/* 내용 */}
          <div className="text-sm mt-2 mb-3 whitespace-pre-line">{review.reviewContent}</div>
          {/* 별점 */}
          <div className="flex items-center text-orange-500 font-semibold gap-1 self-end">
            <FaStar size={16} />
            <span className="text-base">{review.storeGrade}점</span>
          </div>
        </div>
      ))}
    </section>
  );
}

export default StoreReviewList;