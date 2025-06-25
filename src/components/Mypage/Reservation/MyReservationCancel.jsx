import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyReservationCancel = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // 예약 리스트 불러오기
    const fetchReservations = async () => {
      try {
        const res = await axios.get("/api/mypage/reservations", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setReservations(res.data);
      } catch (err) {
        setError("예약 목록을 불러오지 못했습니다.");
      }
    };

    fetchReservations();
  }, [cancelSuccess]);

  const handleCancelClick = (reservationId, reservationDate) => {
    const today = new Date();
    const date = new Date(reservationDate);
    const diffDays = (date - today) / (1000 * 60 * 60 * 24);

    if (diffDays <= 1) {
      alert("1일 이내 예약은 사장님께 직접 연락해주세요.");
      return;
    }

    setSelectedReservationId(reservationId);
    setShowCancelModal(true);
  };

  const handleSubmitCancel = async () => {
    if (!selectedReservationId) {
      setError("취소할 예약이 선택되지 않았습니다.");
      return;
    }

    const reason = cancelReason === "기타" ? customReason : cancelReason;

    if (!reason.trim()) {
      setError("취소 사유를 입력해주세요.");
      return;
    }

    try {
      const res = await axios.patch(
        "/api/mypage/reservations/cancel",
        {
          reservationId: selectedReservationId,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.code === "200") {
        setCancelSuccess(true);
        setShowCancelModal(false);
        alert("예약이 성공적으로 취소되었습니다.");
      } else {
        setError(res.data.message || "예약 취소 실패");
      }
    } catch (err) {
      setError("서버 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">예약 취소</h2>

      {reservations.map((res) => (
        <div key={res.id} className="border-b py-4 flex justify-between">
          <div>
            <p className="text-sm">{res.storeName}</p>
            <p className="text-xs text-gray-500">
              {res.reservationDate} {res.reservationTime}
            </p>
          </div>
          <button
            className="bg-red-500 text-white text-sm px-4 py-1 rounded"
            onClick={() => handleCancelClick(res.id, res.reservationDate)}
          >
            예약취소
          </button>
        </div>
      ))}

      {/* 취소 모달 */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-[90%] max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              취소 사유를 선택해주세요
            </h3>

            <div className="space-y-2">
              {["단순 변심", "날짜 착오", "기타"].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    value={option}
                    checked={cancelReason === option}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}

              {cancelReason === "기타" && (
                <input
                  type="text"
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="상세 사유 입력"
                  className="border rounded w-full px-3 py-1"
                />
              )}
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 text-sm border rounded"
                onClick={() => setShowCancelModal(false)}
              >
                닫기
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white text-sm rounded"
                onClick={handleSubmitCancel}
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

export default MyReservationCancel;
