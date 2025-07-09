// 요일을 한글로 반환 ("일", "월", ..., "토")
export const getDayNameKor = (date) => {
  const dayKor = ["일", "월", "화", "수", "목", "금", "토"];
  return dayKor[date.getDay()];
};

// 특정 날짜가 범위 안에 있는지 확인
export const isDateInRange = (target, start, end) => {
  if (!start || !end) return false;
  const d = new Date(target);
  const s = new Date(start);
  const e = new Date(end);
  d.setHours(0, 0, 0, 0);
  s.setHours(0, 0, 0, 0);
  e.setHours(0, 0, 0, 0);
  return d >= s && d <= e;
};
// yyyy-MM-dd 포맷 문자열 반환
export const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};
