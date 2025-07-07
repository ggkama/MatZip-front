export const dateUtils = (date) => {
  const dayKor = ["일", "월", "화", "수", "목", "금", "토"];
  return dayKor[date.getDay()];
};
