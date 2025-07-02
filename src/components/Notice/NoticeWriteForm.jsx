import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiService } from "../../api/apiService";

const NoticeWriteForm = () => {
  const [params] = useSearchParams();
  const mode = params.get("mode"); // "edit" or null
  const noticeNo = params.get("noticeNo");
  const navi = useNavigate();

  const [form, setForm] = useState({
    noticeTitle: "",
    noticeContent: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (!form.noticeTitle || !form.noticeContent) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const url = mode === "edit"
      ? `/api/notice/${noticeNo}`
      : `/api/notice/write`;

    const method = mode === "edit"
      ? apiService.put
      : apiService.post;

    method(url, form)
      .then(() => {
        alert(`공지사항이 ${mode === "edit" ? "수정" : "등록"}되었습니다.`);
        navi("/notice");
      })
      .catch((err) => {
        console.error("공지사항 저장 실패", err);
        alert("처리에 실패했습니다.");
      });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6">
      <h2 className="text-xl font-bold mb-4">
        {mode === "edit" ? "공지사항 수정" : "공지사항 작성"}
      </h2>
      <div className="mb-4">
        <label className="block mb-2">제목</label>
        <input
          type="text"
          name="noticeTitle"
          value={form.noticeTitle}
          onChange={handleChange}
          className="w-full border p-2"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2">내용 입력</label>
        <textarea
          name="noticeContent"
          value={form.noticeContent}
          onChange={handleChange}
          className="w-full border p-2 h-40"
        ></textarea>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-orange-400 text-white px-4 py-2 rounded"
      >
        {mode === "edit" ? "수정하기" : "작성하기"}
      </button>
    </div>
  );
};

export default NoticeWriteForm;
