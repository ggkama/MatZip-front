import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { apiService } from "../../../api/apiService";

const MyReviewsDetail = () => {
  const [reviews, setReviews] = useState([]);
  const navi = useNavigate();
  const location = useLocation();

  const reviewNo = location.state?.review?.reviewNo;

  useEffect(() => {
    if (!reviewNo) {
      console.warn("리뷰 번호가 없습니다.");
      return;
    }
    apiService
      .get(`/api/review/myreview/detail/${reviewNo}`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.error("내 리뷰 불러오기 실패", err);
      });
  }, [reviewNo]);

  // 삭제
  const handleDelete = (reviewNo) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      apiService
        .delete(`/api/review/delete/${reviewNo}`)
        .then(() => {
          alert("삭제 완료");
          navi(-1);
        })
        .catch(() => {
          alert("삭제 실패");
        });
    }
  };

  // 수정
  const handleEdit = (review) => {
    navi("/review-form", { state: { review, isEdit: true } });
  };

  if (!reviews.length) {
    return <div className="text-center mt-10">작성한 리뷰가 없습니다.</div>;
  }

  return (
    <div className="py-12 max-w-4xl mx-auto">
      <h2 className="text-center text-2xl font-semibold mb-12">내 리뷰 내역</h2>

      {reviews.map((review, idx) => (
        <div key={idx} className="border rounded-md p-8 mb-10">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold">{review.storeName || "가게명 없음"}</h3>
            <span className="text-sm text-gray-500">
              {formatDate(review.createDate)}
            </span>
          </div>
          <div className="text-sm text-gray-700 font-semibold mb-4">
            {review.storeGrade}점
          </div>
          <p className="text-sm text-gray-800 mb-4">{review.reviewContent}</p>
          {/* 이미지 여러장 넣기 */}
          {Array.isArray(review.imageUrls) && review.imageUrls.length > 0 ? (
            <div className="flex gap-4 mb-4">
              {review.imageUrls.map((url, idx) => (
                <img
                  key={idx}
                  src={`http://localhost:8080${url}`}
                  alt={`리뷰 이미지${idx + 1}`}
                  className="w-[100px] h-[100px] object-cover rounded bg-gray-200"
                />
              ))}
            </div>
          ) : review.reviewImageUrl ? (
            <div className="flex gap-4 mb-4">
              <img
                src={review.reviewImageUrl.startsWith("http") ? review.reviewImageUrl : `http://localhost:8080${review.reviewImageUrl}`}
                alt="리뷰 이미지"
                className="w-[100px] h-[100px] object-cover rounded bg-gray-200"
              />
            </div>
          ) : null}

          {/* 수정버튼 */}
          <div className="flex gap-4 justify-end mt-4">
            <button
              className="px-4 py-2 bg-orange-500 text-white rounded"
              onClick={() => handleEdit(review)}
            >
              수정
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => handleDelete(review.reviewNo)}
            >
              삭제
            </button>
          </div>
        </div>
      ))}

      <div className="text-center mt-8">
        <button
          onClick={() => navi(-1)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded"
        >
          목록
        </button>
      </div>
    </div>
  );
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date)) return "날짜 오류";
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
};

export default MyReviewsDetail;
