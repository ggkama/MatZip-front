import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Test from "./pages/Home/Test";
import Header from "./components/Common/Header/Header";
import Footer from "./components/Common/Footer/Footer";
import SignUp from "./components/Member/SignUp";
import Login from "./components/Member/Login";
import Mypage from "./components/Mypage/MyInfo/Mypage";
import PasswordInput from "./components/Mypage/MyInfo/PasswordInput";
import MyInfoForm from "./components/Mypage/MyInfo/MyInfoForm";
import ChangePassword from "./components/Mypage/MyInfo/NewPassword";
import MyReservaitonList from "./components/Mypage/Reservation/MyReservationList";
import AccountDelete from "./components/Mypage/MyInfo/AccountDelete";
import MyReservationDetail from "./components/Mypage/Reservation/MyReservationDetail";
import WriteReviewForm from "./components/Mypage/Review/WriteReviewForm";
import MyReviewsList from "./components/Mypage/Review/MyReviewsList";
import MyReviewsDetail from "./components/Mypage/Review/MyReviewsDetail";
import OwnerPage from "./components/Owner/OwnerPage";
import RegisterStoreForm from "./components/Owner/RegiseterStoreForm/RegisterStoreForm";
import OwnerReservationList from "./components/Owner/OwnerReservationList";
import OwnerReservationDetail from "./components/Owner/OwnerReservationDetail";
import OwnerReviewList from "./components/Owner/OwnerReviewList";
import OwnerReviewDetail from "./components/Owner/OwnerReviewDetail";
import ReservationForm from "./components/Reservation/ReservationForm";
import Admin from "./components/Admin/Admin";
import UserList from "./components/Admin/ManageUser/UserList";
import UserDetail from "./components/Admin/ManageUser/UserDetail";
import OwnerList from "./components/Admin/ManageOwner/OwnerList";
import OwnerDetail from "./components/Admin/ManageOwner/OwnerDetail";
import RegisterOwner from "./components/Mypage/RegisterOwner/RegisterOwner";
import NoticeList from "./components/Notice/NoticeList";
import NoticeDetail from "./components/Notice/NoticeDetail";
import NoticeWriteForm from "./components/Notice/NoticeWriteForm";
import StoreDetail from "./components/Store/StoreDetail";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* 마이페이지 */}
          <Route path="/my-page" element={<Mypage />} />
          <Route path="/my-password" element={<PasswordInput />} />
          <Route path="/my-info" element={<MyInfoForm />} />
          <Route path="/new-password" element={<ChangePassword />} />
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
          <Route path="/my-review-list" element={<MyReviewsList />} />
          <Route path="/my-review-detail" element={<MyReviewsDetail />} />
          <Route path="/my-register-owner" element={<RegisterOwner />} />
          {/* 공지사항 */}
          <Route path="/notice" element={<NoticeList />} />
          <Route path="/notice-detail" element={<NoticeDetail />} />
          <Route path="/notice-write" element={<NoticeWriteForm />} />

          {/* 사장님 마이페이지 */}
          <Route path="/owner-page" element={<OwnerPage />} />
          <Route path="/register-store" element={<RegisterStoreForm />} />
          <Route path="/store-reservation" element={<OwnerReservationList />} />
          <Route
            path="/store-reservation-detail"
            element={<OwnerReservationDetail />}
          />
          <Route path="/store-review" element={<OwnerReviewList />} />
          <Route path="/store-review-detail" element={<OwnerReviewDetail />} />
          {/* 예약하기 */}
          <Route path="/reservaion-form" element={<ReservationForm />} />

          {/* 관리자 페이지 */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/user-list" element={<UserList />} />
          <Route path="/admin/user/:userNo" element={<UserDetail />} />
          <Route path="/admin/owner-list" element={<OwnerList />} />
          <Route path="/admin/owner/:registerNo" element={<OwnerDetail />} />
          {/* 가게 상세페이지 */}
          <Route path="/store" element={<StoreDetail />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
