import "./App.css";
import { Routes, Route } from "react-router-dom";
import Test from "./pages/Home/Test";
import Header from "./components/Common/Header/Header";
import Footer from "./components/Common/Footer/Footer";
import Mypage from "./components/Mypage/MyInfo/Mypage";
import PasswordInput from "./components/Mypage/MyInfo/PasswordInput";
import MyInfoForm from "./components/Mypage/MyInfo/MyInfoForm";
import ChangePassword from "./components/Mypage/MyInfo/NewPassword";
import MyReservaitonList from "./components/Mypage/Reservation/MyReservatonList";
import AccountDelete from "./components/Mypage/MyInfo/AccountDelete";
import MyReservationDetail from "./components/Mypage/Reservation/MyReservationDetail";
import WriteReviewForm from "./components/Mypage/Review/WriteReviewForm";
import MyReviews from "./components/Mypage/Review/MyReviews";
import MyReviewsDetail from "./components/Mypage/Review/MyReviewsDetail";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/test" element={<Test />} />
          {/* 마이페이지 */}
          <Route path="/my-page" element={<Mypage />} />
          <Route path="/my-password" element={<PasswordInput />} />
          <Route path="/my-info" element={<MyInfoForm />} />
          <Route path="/new-passwo rd" element={<ChangePassword />} />
          <Route path="/my-reservation-list" element={<MyReservaitonList />} />
          <Route
            path="/my-reservation-detail"
            element={<MyReservationDetail />}
          />
          <Route path="/account-delete" element={<AccountDelete />} />
          <Route
            path="/my-reservation-detail"
            element={<MyReservationDetail />}
          />
          <Route path="/review-form" element={<WriteReviewForm />} />
          <Route path="/my-review-list" element={<MyReviews />} />
          <Route path="/my-review-detail" element={<MyReviewsDetail />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
