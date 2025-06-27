import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OwnerReservationDetail = () => {
  const navi = useNavigate();

  const reservation = {
    userName: "홍길동",
    userPhone: "02-1234-1234",
    reservationDate: "2025.06.18",
    reservationTime: "18:00",
    peopleCount: 3,
  };

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [customReason, setCustomReason] = useState("");

  const handleCancelConfirm = () => {
    if (!customReason.trim()) {
      alert("취소 사유를 입력해주세요.");
      return;
    }

    // TODO: API 호출
    console.log("취소 사유:", customReason);
    setShowCancelModal(false);
    alert("예약이 취소되었습니다.");
  };

  return (
    <div className="flex flex-col items-center pt-10 pb-20 px-4">
      <h2 className="text-3xl font-bold mb-10">내 가게 예약 내역</h2>

      <div className="space-y-3 text-sm w-[300px] mx-auto">
        <InfoRow label="예약자명" value={reservation.userName} />
        <InfoRow label="핸드폰번호" value={reservation.userPhone} />
        <InfoRow label="예약 일시" value={reservation.reservationDate} />
        <InfoRow label="예약 시간" value={reservation.reservationTime} />
        <InfoRow label="인원수" value={reservation.peopleCount} />

        <button
          onClick={() => setShowCancelModal(true)}
          className="mt-4 bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
        >
          예약취소
        </button>
      </div>

      <button
        onClick={() => navi("/store-reservation")}
        className="mt-12 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
      >
        목록
      </button>

      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md">
            <h3 className="text-lg font-bold mb-4">예약을 취소하시겠습니까?</h3>

            <input
              type="text"
              placeholder="사유 입력"
              className="w-full border px-2 py-1 rounded mb-4"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-1 bg-gray-300 rounded"
              >
                닫기
              </button>
              <button
                onClick={handleCancelConfirm}
                disabled={!customReason.trim()}
                className={`px-4 py-1 rounded ${
                  !customReason.trim()
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
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

const InfoRow = ({ label, value }) => (
  <div className="flex text-sm">
    <div className="w-30 font-medium mr-3">{label}</div>
    <div>{value}</div>
  </div>
);

export default OwnerReservationDetail;
