import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../api/apiService";
import Pagination from "../../components/Pagenation/Pagenation";

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [role, setRole] = useState(""); // admin 확인

  const navi = useNavigate();

  useEffect(() => {
    apiService
      .get(`/api/notice`, { params: { page: page, size: 5 } })
      .then((res) => {
        setNotices(res.data.noticeList);

        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.error("공지사항 불러오기 실패:", err);
      });

    const raw = sessionStorage.getItem("tokens");
    const accessToken = raw ? JSON.parse(raw).accessToken : null;
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        setRole(decoded.userRole);
      } catch {
        setRole("");
      }
    } else {
      setRole("");
    }
  }, [page]);

  const handleRowClick = (noticeNo) => {
    navi(`/notice-detail?noticeNo=${noticeNo}`);
  };

  const handleWriteClick = () => {
    navi("/notice-write");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-xl font-bold text-center mb-6">공지사항</h2>
      <table className="w-full border border-gray-300 text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border">번호</th>
            <th className="py-2 px-4 border">제목</th>
            <th className="py-2 px-4 border">작성자</th>
            <th className="py-2 px-4 border">작성일</th>
          </tr>
        </thead>
        <tbody>
          {notices.length > 0 ? (
            notices.map((notice) => (
              <tr
                key={notice.noticeNo}
                onClick={() => handleRowClick(notice.noticeNo)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <td className="py-2 px-4 border">{notice.noticeNo}</td>
                <td className="py-2 px-4 border">{notice.noticeTitle}</td>
                <td className="py-2 px-4 border">{notice.userName}</td>
                <td className="py-2 px-4 border">{notice.createDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-4">
                등록된 공지사항이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
        {role === "ROLE_ADMIN" && (
          <button
            onClick={handleWriteClick}
            className="bg-orange-400 text-white px-4 py-2 rounded"
          >
            공지사항 작성
          </button>
        )}
      </div>
    </div>
  );
};

export default NoticeList;
