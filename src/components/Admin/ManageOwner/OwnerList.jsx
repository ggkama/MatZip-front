import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import Pagination from "../../Pagenation/Pagenation";

const OwnerList = () => {
  const navi = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const userList = () => {
      axiosInstance
        .get(`/api/admin/manage/ownerList?page=${currentPage}`)
        .then((response) => {
          console.log(response.data.ownerList);

          setUsers(response.data.ownerList);
          setTotalPages(response.data.totalPages);
        })
        .catch((error) => {
          console.log(error);
          alert("사용자 리스트 조회에 실패했습니다.");
        });
    };
    userList();
  }, [currentPage]);

  const convertStatus = (status) =>
    status === "Y" ? "처리 완료" : "처리 대기";

  return (
    <div className="flex flex-col items-center pt-10 pb-20 px-4">
      <div className="w-full max-w-6xl">
        <button
          onClick={() => navi("/admin")}
          className="mb-4 flex items-center text-orange-500 hover:underline"
        >
          <IoArrowBack className="mr-1" />
          뒤로가기
        </button>

        <h2 className="text-2xl font-bold text-center mb-5">
          사장님 신청 내역
        </h2>

        <table className="w-full border-t-2 border-b-2 border-black text-sm text-center table-fixed">
          <thead>
            <tr className="border-b border-gray-500 font-semibold">
              <th className="py-3">신청자명</th>
              <th className="py-3">아이디</th>
              <th className="py-3">신청일</th>
              <th className="py-3">신청 상태</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.registerNo}
                  className="border-b border-gray-300 hover:bg-gray-100"
                  onClick={() => navi(`/admin/owner/${user.registerNo}`)}
                >
                  <td className="py-3">{user.userName}</td>
                  <td className="py-3">{user.userId}</td>
                  <td className="py-3">{user.requestDate.split("T")[0]}</td>
                  <td className="py-3">
                    <span
                      className={`inline-block px-3 py-1 rounded text-xs font-medium ${
                        user.status === "N"
                          ? "bg-red-500 text-white"
                          : "bg-orange-100 text-gray-700"
                      }`}
                    >
                      {convertStatus(user.status)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-6 text-gray-400">
                  사장님 신청 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default OwnerList;
