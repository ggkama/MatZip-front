import React, { useEffect, useState } from "react";
import "./css/ReservationForm.css";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReservationForm = () => {
  const navigate = useNavigate();

  // 더미 storeInfo
  const [storeInfo, setStoreInfo] = useState({
    openTime: 14, // 오후 2시
    closeTime: 22, // 오후 10시
    dayOff: [1, 3], // 월요일 휴무
  });

  const [reservationDate, setReservationDate] = useState(null);
  const [reservationTime, setReservationTime] = useState("");
  const [personCount, setPersonCount] = useState(1);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [reservedTimes, setReservedTimes] = useState(["17:00"]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // 날짜 선택 시 예약 가능한 시간 계산
  useEffect(() => {
    if (!reservationDate) return;

    const hours = [];
    for (let h = storeInfo.openTime; h <= storeInfo.closeTime; h++) {
      const hourStr = h.toString().padStart(2, "0") + ":00";
      hours.push(hourStr);
    }

    setAvailableTimes(hours);

    // 예약된 시간 (더미)
    const reserved = reservationDate.getDate() === 18 ? ["17:00"] : [];
    setReservedTimes(reserved);
  }, [reservationDate, storeInfo]);

  const handleReservation = () => {
    if (!reservationDate || !reservationTime || personCount < 1) {
      setError("날짜, 시간, 인원을 정확히 선택해주세요.");
      return;
    }

    const day = reservationDate.getDay();
    if (storeInfo.dayOff.includes(day)) {
      setError("선택한 날짜는 휴무일입니다.");
      return;
    }

    if (reservedTimes.includes(reservationTime)) {
      setError("이미 예약된 시간입니다.");
      return;
    }

    // 예약 성공 처리 (더미)
    setError("");
    setSuccess(true);
    console.log("예약 완료:", {
      date: reservationDate.toLocaleDateString(),
      time: reservationTime,
      personCount,
    });
  };

  const increaseCount = () => setPersonCount((prev) => prev + 1);
  const decreaseCount = () => setPersonCount((prev) => Math.max(1, prev - 1));

  return (
    <div className="flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold mb-6">맛집 예약</h2>

      <div className="flex gap-10 items-start">
        {/* 날짜 선택 */}
        <DatePicker
          selected={reservationDate}
          onChange={(date) => setReservationDate(date)}
          dateFormat="yyyy.MM.dd"
          minDate={new Date()}
          filterDate={(date) => !storeInfo.dayOff.includes(date.getDay())}
          inline
        />

        {/* 인원 및 시간 선택 */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 mt-4">
            <span className="font-semibold text-sm">인원수</span>

            <div className="flex items-center border rounded px-3 py-1">
              <button
                onClick={decreaseCount}
                className="w-6 h-6 flex items-center justify-center border border-gray-400 rounded hover:bg-gray-100"
              >
                –
              </button>

              <span className="mx-4 text-sm">{personCount}명</span>

              <button
                onClick={increaseCount}
                className="w-6 h-6 flex items-center justify-center border border-gray-400 rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div className="time-table">
            <p className="mb-2">시간 선택</p>
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  disabled={reservedTimes.includes(time)}
                  className={`px-3 py-1 rounded border ${
                    reservationTime === time
                      ? "bg-orange-500 text-white"
                      : reservedTimes.includes(time)
                      ? "bg-gray-200 text-gray-400"
                      : "bg-white"
                  }`}
                  onClick={() => setReservationTime(time)}
                >
                  오후 {parseInt(time) - 12}시
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {success && (
        <div className="text-green-600 mt-4">예약이 완료되었습니다!</div>
      )}

      {/* 예약 버튼 */}
      <button
        onClick={handleReservation}
        className="mt-8 bg-orange-500 text-white px-6 py-2 rounded"
      >
        예약하기
      </button>
    </div>
  );
};

export default ReservationForm;
