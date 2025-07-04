import { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const RegisterOwner = () => {
  const navi = useNavigate();

  const [storeName, setStoreName] = useState("");
  const [businessNo, setBusinessNo] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!storeName || !businessNo || !file) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("storeName", storeName);
    formData.append("businessNo", businessNo);
    formData.append("file", file);

    axiosInstance
      .post("/api/mypage/registerOwner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        alert(response.data.message);
        navi("/my-page");
      })
      .catch((error) => {
        console.error(error);
        alert(error.response.data.message || "신청에 실패했습니다.");
      });
  };

  return (
    <div className="flex flex-col items-center pt-10 pb-20 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded shadow space-y-6 text-base"
      >
        <h2 className="text-2xl font-bold text-center mb-2">
          사장님 등록 신청
        </h2>

        <p className="text-base text-gray-700 mb-4">*표시는 필수입니다.</p>

        <div className="flex items-center text-base">
          <label className="w-32 font-medium">매장명 *</label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="flex-1 border border-orange-300 px-4 py-2 rounded"
          />
        </div>

        <div className="flex items-center text-base">
          <label className="w-32 font-medium">사업자등록번호 *</label>
          <input
            type="text"
            placeholder="123-45-67890"
            value={businessNo}
            onChange={(e) => setBusinessNo(e.target.value)}
            className="flex-1 border border-orange-300 px-4 py-2 rounded"
          />
        </div>

        {/* 파일 업로드 */}
        <div className="text-base">
          <label className="block font-medium mb-1">첨부파일 *</label>

          {!file && (
            <label className="inline-block bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded cursor-pointer text-sm">
              파일 업로드
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}

          {file && (
            <div className="space-y-2">
              <p className="text-sm text-gray-700 truncate">{file.name}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-sm"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                  }}
                >
                  삭제
                </button>

                <label className="bg-orange-400 hover:bg-orange-500 text-white px-3 py-1 rounded cursor-pointer text-sm">
                  다시 업로드
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        {preview && (
          <img
            src={preview}
            alt="미리보기"
            className="w-full h-auto rounded border border-gray-300"
          />
        )}

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold text-lg"
        >
          신청하기
        </button>
      </form>
    </div>
  );
};

export default RegisterOwner;
