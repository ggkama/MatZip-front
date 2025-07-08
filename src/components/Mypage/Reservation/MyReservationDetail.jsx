import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiService } from "../../../api/apiService";

const MyReservationDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reservationNo = location.state?.reservationNo;

  const [reservation, setReservation] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  useEffect(() => {
    if (!reservationNo) {
      alert("잘못된 접근입니다.");
      navigate("/my-reservation-list");
      return;
    }

    apiService
      .get(`/api/reservation/mypage/detail/${reservationNo}`)
      .then((res) => {
        setReservation(res.data);
      })
      .catch((err) => {
        console.error("예약 상세 조회 실패", err);
        alert("예약 정보를 불러오는 데 실패했습니다.");
        navigate("/my-reservation-list");
      });
  }, [reservationNo]);

  const handleCancelConfirm = () => {
    if (!cancelReason) return alert("취소 사유를 선택해주세요.");
    if (cancelReason === "기타" && !customReason.trim())
      return alert("기타 사유를 입력해주세요.");

    const reason = cancelReason === "기타" ? customReason : cancelReason;

    apiService
      .patch("/api/reservation/mypage/cancel", {
        reservationNo,
        cancelReason: reason,
      })
      .then(() => {
        alert("예약이 취소되었습니다.");
        navigate("/my-reservation-list");
      })
      .catch((err) => {
        console.error("예약 취소 실패", err);
        alert("예약 취소에 실패했습니다.");
      });

    setShowCancelModal(false);
  };

  if (!reservation) return null;

  return (
    <div className="flex flex-col items-center pt-10 pb-20 px-4">
      <h2 className="text-3xl font-bold mb-10">내 예약 내역</h2>

      {reservation.status === "N" && (
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[720px] bg-red-100 border border-red-300 text-red-700 px-6 py-4 mb-10 rounded-lg flex items-center gap-3">
            <svg
              className="w-6 h-6 text-red-500 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636L5.636 18.364M5.636 5.636l12.728 12.728"
              />
            </svg>
            <p className="text-lg font-semibold">
              이 예약은 취소된 상태입니다.
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-10 max-w-4xl w-full justify-center items-start">
        <div className="w-[300px] h-[300px] bg-gray-300 shrink-0">
          {reservation.storeImage ? (
            <img
              src={`${reservation.storeImage}`}
              alt="가게 이미지"
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-sm text-gray-500">
              이미지 없음
            </div>
          )}
        </div>

        <div className="space-y-3 text-sm w-[380px]">
          <InfoRow label="매장명" value={reservation.storeName} />
          <InfoRow
            label="주소"
            value={`${reservation.storeAddress1} ${reservation.storeAddress2}`}
          />
          <InfoRow label="매장번호" value={reservation.storePhone} />
          <InfoRow label="예약 일시" value={reservation.reservationDate} />
          <InfoRow label="예약 시간" value={reservation.reservationTime} />
          <InfoRow label="인원수" value={`${reservation.personCount}명`} />

          {reservation.status !== "N" && (
            <button
              onClick={() => setShowCancelModal(true)}
              className="mt-4 bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600 cursor-pointer"
            >
              예약취소
            </button>
          )}
        </div>
      </div>

      <button
        onClick={() => navigate("/my-reservation-list")}
        className="mt-12 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 cursor-pointer"
      >
        목록
      </button>

      {showCancelModal && (
        <CancelModal
          cancelReason={cancelReason}
          customReason={customReason}
          setCancelReason={setCancelReason}
          setCustomReason={setCustomReason}
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleCancelConfirm}
        />
      )}
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex text-sm">
    <div className="w-30 font-bold mr-3">{label}</div>
    <div className="text-gray-600">{value}</div>
  </div>
);

const CancelModal = ({
  cancelReason,
  customReason,
  setCancelReason,
  setCustomReason,
  onClose,
  onConfirm,
}) => {
  const options = ["단순 변심", "날짜 착오", "기타"];

  return (
    <div className="fixed inset-0 bg-opacity-60 flex justify-center items-center z-50 bg-black">
      <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md">
        <h3 className="text-lg font-bold mb-4">예약을 취소하시겠습니까?</h3>

        <div className="space-y-2 mb-4">
          {options.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name="reason"
                value={option}
                checked={cancelReason === option}
                onChange={(e) => setCancelReason(e.target.value)}
              />
              {option}
            </label>
          ))}
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

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-1 bg-gray-300 rounded">
            닫기
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-1 bg-red-500 text-white rounded"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyReservationDetail;
