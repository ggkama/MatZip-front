// utils/phone.js

export const formatPhoneNumber = (value) => {
  const onlyNums = value.replace(/[^0-9]/g, "");

  if (onlyNums.startsWith("02")) {
    if (onlyNums.length <= 2) return onlyNums;
    if (onlyNums.length <= 5)
      return `${onlyNums.slice(0, 2)}-${onlyNums.slice(2)}`;
    if (onlyNums.length <= 9)
      return `${onlyNums.slice(0, 2)}-${onlyNums.slice(2, 5)}-${onlyNums.slice(
        5
      )}`;
    return `${onlyNums.slice(0, 2)}-${onlyNums.slice(2, 6)}-${onlyNums.slice(
      6,
      10
    )}`;
  } else {
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 6)
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    if (onlyNums.length <= 10)
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(
        6
      )}`;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(
      7,
      11
    )}`;
  }
};

export const isValidPhoneNumber = (value) => {
  const phoneRegex = /^(0\d{1,2})-(\d{3,4})-(\d{4})$/;
  return phoneRegex.test(value);
};
