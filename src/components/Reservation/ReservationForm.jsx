import { useEffect, useState } from "react";
import "./css/ReservationForm.css";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../../api/axiosInstance";

const ReservationForm = () => {
  const navi = useNavigate();
  const { storeNo } = useParams();

  const [storeInfo, setStoreInfo] = useState({
    name: "",
    openTime: 14,
    closeTime: 22,
    dayOff: [],
    startDate: null,
    endDate: null,
  });

  const [reservationDate, setReservationDate] = useState(null);
  const [reservationTime, setReservationTime] = useState("");
  const [personCount, setPersonCount] = useState(1);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [reservedTimes, setReservedTimes] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // 예약 조건 정보 불러오기
  useEffect(() => {
    const fetchReservationInfo = () => {
      const url = `/api/reservation/${storeNo}`;

      axiosInstance
        .get(url)
        .then((res) => {
          const data = res.data;
          setStoreInfo({
            storeName: data.storeName || "",
            openTime: parseInt(data.openTime),
            closeTime: parseInt(data.closeTime),
            dayOff: data.dayOff || [],
            startDate: data.startDate ? new Date(data.startDate) : null,
            endDate: data.endDate ? new Date(data.endDate) : null,
          });
        })
        .catch((err) => {
          console.error("예약 정보 불러오기 실패", err);
          setError("예약 정보를 불러올 수 없습니다.");
        });
    };

    fetchReservationInfo();
  }, [storeNo]);

  useEffect(() => {
    if (!reservationDate || !storeInfo.openTime || !storeInfo.closeTime) return;

    const hours = [];
    for (let h = storeInfo.openTime; h <= storeInfo.closeTime; h++) {
      const hourStr = h.toString().padStart(2, "0") + ":00";
      hours.push(hourStr);
    }

    setAvailableTimes(hours);

    const reserved = reservationDate.getDate() === 18 ? ["17:00"] : [];
    setReservedTimes(reserved);
  }, [reservationDate, storeInfo]);

  const handleReservation = () => {
    if (!reservationDate || !reservationTime || personCount < 1) {
      setError("날짜, 시간, 인원을 정확히 선택해주세요.");
      return;
    }

    const day = reservationDate.getDay();
    const isDayOff = storeInfo.dayOff.includes(day);
    const isInShutdown =
      storeInfo.startDate &&
      storeInfo.endDate &&
      reservationDate >= storeInfo.startDate &&
      reservationDate <= storeInfo.endDate;

    if (isDayOff || isInShutdown) {
      setError("선택한 날짜는 휴무일입니다.");
      return;
    }

    if (reservedTimes.includes(reservationTime)) {
      setError("이미 예약된 시간입니다.");
      return;
    }

    setError("");
    setSuccess(true);
    console.log("예약 완료:", {
      storeNo,
      date: reservationDate.toLocaleDateString(),
      time: reservationTime,
      personCount,
    });
  };

  const increaseCount = () => setPersonCount((prev) => prev + 1);
  const decreaseCount = () => setPersonCount((prev) => Math.max(1, prev - 1));

  return (
    <div className="flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold mb-2">맛집 예약</h2>
      <p className="text-gray-600 mb-6">
        {storeInfo.storeName || "가게명 불러오는 중..."}
      </p>

      <div className="flex gap-10 items-start">
        <DatePicker
          selected={reservationDate}
          onChange={(date) => setReservationDate(date)}
          dateFormat="yyyy.MM.dd"
          minDate={new Date()}
          filterDate={(date) => {
            const day = date.getDay();
            const isDayOff = storeInfo.dayOff.includes(day);
            const isInShutdown =
              storeInfo.startDate &&
              storeInfo.endDate &&
              date >= storeInfo.startDate &&
              date <= storeInfo.endDate;
            return !isDayOff && !isInShutdown;
          }}
          inline
        />

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

      {error && <div className="text-red-500 mt-4">{error}</div>}
      {success && (
        <div className="text-green-600 mt-4">예약이 완료되었습니다!</div>
      )}

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
