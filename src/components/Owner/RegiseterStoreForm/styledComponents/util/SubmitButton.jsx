const SubmitButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md"
  >
    등록하기
  </button>
);

export default SubmitButton;
