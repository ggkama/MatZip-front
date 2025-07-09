import { useState } from "react";

const SubmitButton = ({ onClick }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    Promise.resolve(onClick()).finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isSubmitting}
      className={`w-full mt-5 font-semibold py-3 rounded-md text-white
        ${
          isSubmitting
            ? "bg-orange-300 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600"
        }
      `}
    >
      {isSubmitting ? "등록 중..." : "등록하기"}
    </button>
  );
};

export default SubmitButton;
