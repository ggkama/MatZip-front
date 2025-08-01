import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiService } from "../../api/apiService";

const NoticeDetail = () => {
  const [notice, setNotice] = useState(null);
  const [params] = useSearchParams();
  const navi = useNavigate();
  const noticeNo = params.get("noticeNo");

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userRole = sessionStorage.getItem("userRole");
    setIsAdmin(userRole === "ROLE_ADMIN");
  }, []);

  useEffect(() => {
    apiService
      .get(`/api/notice/${noticeNo}`)
      .then((res) => {
        setNotice(res.data[0]);
      })
      .catch((err) => {
        console.log("상세조회 에러", err);
      });
  }, [noticeNo]);

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      apiService
        .delete(`/api/notice/${noticeNo}`)
        .then(() => {
          alert("삭제 완료");
          navi("/notice");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-6">
      {notice && (
        <>
          <h2 className="text-2xl font-bold mb-4">{notice.noticeTitle}</h2>
          <div className="text-sm text-gray-500 mb-6">
            작성자: {notice.userName} | {notice.createDate}
          </div>
          <div className="border-t pt-6 text-base whitespace-pre-wrap">
            {notice.noticeContent}
          </div>
          <div className="mt-6">
            <button
              onClick={() => navi("/notice")}
              className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
            >
              목록으로 가기
            </button>
          </div>
          {/* 관리자만 수정/삭제 가능 */}
          {isAdmin && (
            <div className="mt-6 space-x-4">
              <button
                onClick={() =>
                  navi(`/notice-write?mode=edit&noticeNo=${notice.noticeNo}`)
                }
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                삭제
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NoticeDetail;
