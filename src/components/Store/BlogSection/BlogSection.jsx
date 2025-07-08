import { useEffect, useState } from "react";
import axios from "axios";

function BlogSection({ storeName }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (!storeName) return;
    axios
      .get(`/api/store/${storeName}/naver-blog`)
      .then((res) => {
        const items = res.data.items || [];
        setBlogs(items);
      })
      .catch(() => setBlogs([]));
  }, [storeName]);

  return (
    <div>
      {blogs.length === 0 && (
        <div className="text-gray-500">검색 결과가 없습니다.</div>
      )}
      {blogs.map((blog, idx) => (
        <a
          key={idx}
          href={blog.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block py-4 border-b border-gray-300 last:border-b-0 hover:opacity-65 transition rounded"
        >
          <div>
            <div className="text-black font-semibold mb-1">
              {blog.title.replace(/<[^>]*>/g, "")}
            </div>
            <p className="text-sm text-gray-700">
              {blog.description.replace(/<[^>]*>/g, "")}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default BlogSection;
