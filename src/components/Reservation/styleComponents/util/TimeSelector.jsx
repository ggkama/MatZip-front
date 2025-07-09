import React from "react";

const TimeSelector = ({
  availableTimes,
  reservedTimes,
  reservationTime,
  setReservationTime,
  formatTimeLabel,
}) => {
  return (
    <div className="time-table">
      <p className="mb-2 font-bold">시간 선택</p>
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
            {formatTimeLabel(time)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector;
