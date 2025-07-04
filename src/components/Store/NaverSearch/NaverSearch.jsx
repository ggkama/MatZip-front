import { useEffect, useState } from "react";
import axios from "axios";

function BlogSection({ storeName }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`/api/store/${storeName}/naver-blog`).then((res) => {
      const items = JSON.parse(res.data).items;
      setBlogs(items);
    });
  }, [storeName]);

  return (
    <div>
      <h2>블로그 후기</h2>
      {blogs.map((blog, idx) => (
        <div key={idx}>
          <a href={blog.link} target="_blank" rel="noopener noreferrer">
            <strong>{blog.title.replace(/<[^>]*>/g, "")}</strong>
          </a>
          <p>{blog.description.replace(/<[^>]*>/g, "")}</p>
        </div>
      ))}
    </div>
  );
}
