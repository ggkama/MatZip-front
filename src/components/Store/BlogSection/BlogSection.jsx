import { useEffect, useState } from "react";
import axios from "axios";

function BlogSection({ storeName }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (!storeName) return;
    axios
      .get(`/api/store/${(storeName)}/naver-blog`)
      .then((res) => {
        const items = res.data.items || [];
        setBlogs(items);
      })
      .catch(() => setBlogs([]));
  }, [storeName]);

  return (
    <div>
      <h2>블로그 후기</h2>
      {blogs.length === 0 && <div>검색 결과가 없습니다.</div>}
      {blogs.map((blog, idx) => (
        <div key={idx} className="mb-4">
          <a href={blog.link} target="_blank" rel="noopener noreferrer">
            <strong>{blog.title.replace(/<[^>]*>/g, "")}</strong>ㄱ
          </a>
          <p>{blog.description.replace(/<[^>]*>/g, "")}</p>
        </div>
      ))}
    </div>
  );
}

export default BlogSection;