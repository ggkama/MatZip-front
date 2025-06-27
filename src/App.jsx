import "./App.css";
import { Routes, Route } from "react-router-dom";
import Test from "./pages/Home/Test";
import Header from "./components/Common/Header/Header";
import Footer from "./components/Common/Footer/Footer";
import Mypage from "./components/Mypage/Mypage";
import SignUp from "./components/Member/SignUp";
import Login from "./components/Member/Login";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/test" element={<Test />} />
          <Route path="/my-page" element={<Mypage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
