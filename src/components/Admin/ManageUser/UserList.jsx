import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import Pagination from "../../Pagenation/Pagenation";

const UserList = () => {
  const navi = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const userList = () => {
      axiosInstance
        .get(`/api/admin/manage/userList?page=${currentPage}`)
        .then((response) => {
          setUsers(response.data.userList);
          setTotalPages(response.data.totalPages);
        })
        .catch((error) => {
          console.log(error);
          alert("사용자 리스트 조회에 실패했습니다.");
        });
    };
    userList();
  }, [currentPage]);

  const convertRole = (role) => {
    if (role === "ROLE_ADMIN") {
      return "관리자";
    } else if (role === "ROLE_OWNER") {
      return "사장님";
    } else {
      return "사용자";
    }
  };

  const convertStatus = (isDeleted) => (isDeleted === "Y" ? "탈퇴" : "사용중");

  return (
    <div className="flex flex-col items-center pt-10 pb-20 px-4">
      <div className="w-full max-w-6xl">
        <button
          onClick={() => navi(-1)}
          className="mb-4 flex items-center text-orange-500 hover:underline"
        >
          <IoArrowBack className="mr-1" />
          뒤로가기
        </button>

        <h2 className="text-2xl font-bold text-center mb-5">회원 리스트</h2>

        <table className="w-full border-t-2 border-b-2 border-black text-sm text-center table-fixed">
          <thead>
            <tr className="border-b border-gray-500 font-semibold">
              <th className="py-3">신청자명</th>
              <th className="py-3">아이디</th>
              <th className="py-3">가입형태</th>
              <th className="py-3">가입일</th>
              <th className="py-3">회원 상태</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.userNo}
                className="border-b border-gray-300 hover:bg-gray-100"
                onClick={() => navi(`/admin/user/${user.userNo}`)}
              >
                <td className="py-3">{user.userName}</td>
                <td className="py-3">{user.userId}</td>
                <td className="py-3">{convertRole(user.userRole)}</td>
                <td className="py-3">{user.enrollDate}</td>
                <td className="py-3">
                  <span
                    className={`inline-block px-3 py-1 rounded text-xs font-medium ${
                      user.isDeleted === "Y"
                        ? "bg-red-500 text-white"
                        : "bg-orange-100 text-gray-700"
                    }`}
                  >
                    {convertStatus(user.isDeleted)}
                  </span>
                </td>
              </tr>
            ))}
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

export default UserList;
