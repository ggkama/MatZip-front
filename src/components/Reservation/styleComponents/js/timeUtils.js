// timeUtils.js

export const formatTimeLabel = (time) => {
  const [hourStr, minStr] = time.split(":");
  const hour = parseInt(hourStr, 10);
  const min = parseInt(minStr, 10);
  const period = hour < 12 ? "오전" : "오후";
  const adjustedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${period} ${adjustedHour}시${min === 0 ? "" : ` ${min}분`}`;
};

export const generateHourlyTimes = (startTime, endTime) => {
  const times = [];
  const start = new Date(`1970-01-01T${startTime}`);
  const end = new Date(`1970-01-01T${endTime}`);

  while (start <= end) {
    const h = start.getHours().toString().padStart(2, "0");
    const m = start.getMinutes().toString().padStart(2, "0");
    times.push(`${h}:${m}`);
    start.setHours(start.getHours() + 1);
  }

  return times;
};
