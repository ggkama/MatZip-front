import React from "react";

const PeopleCounter = ({ personCount, increaseCount, decreaseCount }) => {
  return (
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
  );
};

export default PeopleCounter;
