import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const OwnerReservationDetail = () => {
  const navi = useNavigate();
  const { reservationNo } = useParams();

  const [reservation, setReservation] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [customReason, setCustomReason] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`/api/reservation/owner/detail/${reservationNo}`)
      .then((res) => {
        setReservation(res.data);
      })
      .catch((err) => {
        console.error("예약 상세 조회 실패", err);
        alert("예약 정보를 불러오는 데 실패했습니다.");
      });
  }, [reservationNo]);

  const handleCancelConfirm = () => {
    if (!customReason.trim()) {
      alert("취소 사유를 입력해주세요.");
      return;
    }

    axiosInstance
      .patch("/api/reservation/owner/cancel", {
        reservationNo,
        cancelReason: customReason.trim(),
      })
      .then(() => {
        alert("예약이 취소되었습니다.");
        setReservation((prev) => ({ ...prev, status: "N" }));
        setShowCancelModal(false);
      })
      .catch((err) => {
        console.error("예약 취소 실패", err);
        alert("예약 취소에 실패했습니다.");
      });
  };

  if (!reservation)
    return <p className="text-center mt-10">예약 정보 불러오는 중...</p>;

  return (
    <div className="flex flex-col items-center pt-10 pb-20 px-4">
      <h2 className="text-3xl font-bold mb-10">내 가게 예약 상세</h2>

      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6 space-y-4 border border-gray-200">
        <InfoRow label="예약자명" value={reservation.userName} />
        <Divider />
        <InfoRow label="핸드폰번호" value={reservation.userPhone} />
        <Divider />
        <InfoRow
          label="예약 일자"
          value={reservation.reservationDate?.split("T")[0]}
        />
        <Divider />
        <InfoRow label="예약 시간" value={reservation.reservationTime} />
        <Divider />
        <InfoRow label="인원수" value={`${reservation.personCount}명`} />
        <Divider />
        <InfoRow
          label="예약상태"
          value={
            reservation.status === "Y" ? (
              <span className="text-green-600 font-semibold">예약완료</span>
            ) : (
              <span className="text-red-500 font-semibold">예약취소</span>
            )
          }
        />

        {reservation.status === "Y" &&
          new Date(reservation.reservationDate) >=
            new Date().setHours(0, 0, 0, 0) && (
            <button
              onClick={() => setShowCancelModal(true)}
              className="w-full mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              예약취소
            </button>
          )}
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
  <div className="flex justify-between items-center">
    <span className="font-medium text-gray-600">{label}</span>
    <span>{value}</span>
  </div>
);

const Divider = () => <hr className="border-t border-gray-200 my-1" />;

export default OwnerReservationDetail;
