import "./App.css";
import { Routes, Route } from "react-router-dom";
import Test from "./pages/Home/Test";
import Header from "./components/Common/Header/Header";
import Footer from "./components/Common/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
