import { useState, useEffect } from "react";

const OwnerReviewDetail = () => {
  const [reviews, setReviews] = useState([]);
  const [reportTargetIdx, setReportTargetIdx] = useState(null);
  const [reportReason, setReportReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  useEffect(() => {
    const data = [
      {
        storeName: "우래옥 본점",
        createdDate: "2025-06-18",
        content: "기다림의 인내심이 왠만큼 강하지 않으면 먹어 볼 수 없는 집...",
        imgUrls: [
          "https://via.placeholder.com/100",
          "https://via.placeholder.com/100",
        ],
        storeGrade: 5,
      },
    ];
    setReviews(data);
  }, []);

  const handleReport = (idx) => {
    setReportTargetIdx(idx);
    setReportReason("");
    setCustomReason("");
  };

  const confirmReport = () => {
    if (!reportReason) return alert("신고 사유를 선택해주세요.");
    if (reportReason === "기타" && !customReason.trim())
      return alert("기타 사유를 입력해주세요.");

    const reason = reportReason === "기타" ? customReason : reportReason;
    console.log(`리뷰 ${reportTargetIdx} 신고 사유:`, reason);

    setReportTargetIdx(null);
    alert("신고가 접수되었습니다.");
  };

  return (
    <div className="py-12 max-w-4xl mx-auto">
      <h2 className="text-center text-3xl font-semibold mb-12">
        내 가게 리뷰 내역
      </h2>

      {reviews.map((review, idx) => (
        <div key={idx} className="border rounded-md p-8 mb-10">
          <div className="flex items-center mb-2">
            <span className="text-yellow-400 mr-2 text-lg">★</span>
            <span className="text-sm font-bold">{review.storeGrade}점</span>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">{review.storeName}</h3>
            <p className="text-sm text-gray-500">{review.createdDate}</p>
          </div>

          <p className="whitespace-pre-line text-sm text-gray-800 leading-relaxed">
            {review.content}
          </p>

          {review.imgUrls?.length > 0 && (
            <div className="flex gap-4 mt-6">
              {review.imgUrls.slice(0, 3).map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`리뷰 이미지 ${i + 1}`}
                  className="w-[100px] h-[100px] object-cover rounded bg-gray-200"
                />
              ))}
            </div>
          )}

          <div className="mt-6 text-right">
            <button
              onClick={() => handleReport(idx)}
              className="text-sm text-red-600 underline"
            >
              신고하기
            </button>
          </div>
        </div>
      ))}

      <div className="text-center">
        <button
          onClick={() => window.history.back()}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded"
        >
          목록
        </button>
      </div>

      {/* 신고 모달 */}
      {reportTargetIdx !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md">
            <h3 className="text-lg font-bold mb-4">리뷰를 신고하시겠습니까?</h3>

            <div className="space-y-3 mb-4 text-sm">
              {["욕설/비방", "허위 정보", "기타"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="report"
                    value={option}
                    checked={reportReason === option}
                    onChange={(e) => setReportReason(e.target.value)}
                  />
                  {option}
                </label>
              ))}

              {reportReason === "기타" && (
                <input
                  type="text"
                  placeholder="기타 사유 입력"
                  className="mt-2 w-full border px-2 py-1 rounded"
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                />
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setReportTargetIdx(null)}
                className="px-4 py-1 bg-gray-300 rounded"
              >
                닫기
              </button>
              <button
                onClick={confirmReport}
                className="px-4 py-1 bg-red-500 text-white rounded"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerReviewDetail;
