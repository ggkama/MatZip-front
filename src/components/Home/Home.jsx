import React, { useRef, useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import img01 from "../../assets/img/001.jpg";
import img02 from "../../assets/img/002.jpg";
import img03 from "../../assets/img/003.jpg";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../api/apiService";

const slides = [
  {
    img: img01,
    title: "당신의 행복한 순간",
    text: "리뷰가 증명하는 인기 맛집을 한눈에 확인하세요",
  },
  {
    img: img02,
    title: "매일이 미식 여행",
    text: "지금 이 순간, 특별한 한 끼를 경험해보세요",
  },
  {
    img: img03,
    title: "로컬의 맛을 담다",
    text: "당신의 동네에서 찾은 진짜 맛집, 지금 바로 만나보세요",
  },
];

const Home = () => {
  const navi = useNavigate();
  const timerRef = useRef(null);
  const [latestStores, setLatestStores] = useState([]);

  // 상단 메인 슬라이더
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
  });

  // 하단 최신맛집 슬라이더 (조건부로 mount 후 적용)
  const [latestSliderRef, latestSlider] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 30,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 30 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 30 },
      },
    },
    created: () => {
      console.log("🔄 최신맛집 슬라이더 초기화 완료");
    },
  });

  // 메인 슬라이더 자동 이동
  useEffect(() => {
    if (!instanceRef.current) return;
    timerRef.current = setInterval(() => {
      instanceRef.current.next();
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [instanceRef]);

  // 최신맛집 불러오기
  useEffect(() => {
    apiService
      .get("/api/store/latest")
      .then((res) => {
        setLatestStores(res.data);
        console.log("최신 맛집 불러오기 성공", res.data);
      })
      .catch((err) => {
        console.error("최신 맛집 불러오기 실패", err);
      });
  }, []);

  return (
    <div>
      {/* 상단 메인 슬라이더 */}
      <div ref={sliderRef} className="keen-slider">
        {slides.map((slide, idx) => (
          <div key={idx} className="keen-slider__slide relative">
            <img
              src={slide.img}
              alt={`slide ${idx + 1}`}
              className="w-full h-[700px] object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-25 z-0"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10 px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl mb-3">{slide.text}</p>
              <button
                onClick={() => navi("/stores")}
                className="bg-[#FF6A3D] text-white px-6 py-3 font-semibold rounded-3xl transition hover:opacity-80"
              >
                예약하기
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 최신맛집 캐러셀 */}
      <div className="px-20 mt-16">
        <h3 className="text-[24px] font-bold mb-5">최신맛집</h3>

        {latestStores.length > 0 && (
          <div ref={latestSliderRef} className="keen-slider mb-8">
            {latestStores.map((store, idx) => (
              <div
                key={idx}
                className="keen-slider__slide bg-white rounded shadow overflow-hidden relative cursor-pointer hover:opacity-65"
                onClick={() => navi(`/store-detail/${store.storeNo}`)}
              >
                <div className="relative w-full h-[300px]">
                  <img
                    src={store.storeImg}
                    alt={store.storeName}
                    className="w-full h-full object-cover"
                  />
                  {/* 오버레이 */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-center py-3">
                    <p className="text-[16px] font-semibold">
                      {store.storeName}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 안내 문구 */}
        <div className="text-center mt-16 mb-30">
          <h2 className="text-2xl font-bold mb-2">당신을 위한 추천 맛집</h2>
          <p className="text-gray-600 mb-3">
            지역에서 사랑받는 인기 매장을 지금 확인해보세요.
          </p>
          <button
            onClick={() => navi("/stores")}
            className="bg-[#FF6A3D] text-white px-6 py-3 rounded-3xl hover:opacity-80 font-bold"
          >
            전체 맛집 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
