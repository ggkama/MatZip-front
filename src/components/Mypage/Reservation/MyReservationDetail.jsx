import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyReservationDetail = () => {
  const navi = useNavigate();

  const reservation = {
    storeName: "우래옥 본점",
    address: "서울특별시 중구 주교동 118-1",
    phone: "02-1234-1234",
    date: "2025.06.18",
    time: "18:00",
    people: 3,
    imageUrl: "",
  };

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const handleCancelConfirm = () => {
    if (!cancelReason) {
      alert("취소 사유를 선택해주세요.");
      return;
    }
    if (cancelReason === "기타" && !customReason.trim()) {
      alert("기타 사유를 입력해주세요.");
      return;
    }

    // TODO: API 호출로 취소 요청 보내기
    console.log(
      "취소 사유:",
      cancelReason === "기타" ? customReason : cancelReason
    );
    setShowCancelModal(false);
    alert("예약이 취소되었습니다.");
  };

  return (
    <div className="flex flex-col items-center pt-10 pb-20 px-4">
      <h2 className="text-3xl font-bold mb-10">내 예약 내역</h2>

      <div className="flex flex-col md:flex-row gap-10 max-w-4xl w-full justify-center items-start">
        <div className="w-[300px] h-[300px] bg-gray-300 shrink-0" />

        <div className="space-y-3 text-sm w-[380px]">
          <InfoRow label="매장명" value={reservation.storeName} />
          <InfoRow label="주소" value={reservation.address} />
          <InfoRow label="매장번호" value={reservation.phone} />
          <InfoRow label="예약 일시" value={reservation.date} />
          <InfoRow label="예약 시간" value={reservation.time} />
          <InfoRow label="인원수" value={reservation.people} />

          <button
            onClick={() => setShowCancelModal(true)}
            className="mt-4 bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600 cursor-pointer"
          >
            예약취소
          </button>
        </div>
      </div>

      <button
        onClick={() => navi("/my-reservation-list")}
        className="mt-12 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 cursor-pointer"
      >
        목록
      </button>

      {/* 모달 */}
      {showCancelModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md">
            <h3 className="text-lg font-bold mb-4">예약을 취소하시겠습니까?</h3>

            <div className="space-y-3 mb-4">
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="reason"
                    value="단순 변심"
                    checked={cancelReason === "단순 변심"}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  단순 변심
                </label>
                <label className="flex items-center gap-2 mt-1">
                  <input
                    type="radio"
                    name="reason"
                    value="날짜 착오"
                    checked={cancelReason === "날짜 착오"}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  날짜 착오
                </label>
                <label className="flex items-center gap-2 mt-1">
                  <input
                    type="radio"
                    name="reason"
                    value="기타"
                    checked={cancelReason === "기타"}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  기타
                </label>
                {cancelReason === "기타" && (
                  <input
                    type="text"
                    placeholder="기타 사유 입력"
                    className="mt-2 w-full border px-2 py-1 rounded"
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                  />
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-1 bg-gray-300 rounded"
              >
                닫기
              </button>
              <button
                onClick={handleCancelConfirm}
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

const InfoRow = ({ label, value }) => (
  <div className="flex text-sm">
    <div className="w-30 font-medium mr-3">{label}</div>
    <div>{value}</div>
  </div>
);

export default MyReservationDetail;
