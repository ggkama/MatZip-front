import "./App.css";
import { Routes, Route } from "react-router-dom";
import Test from "./pages/Home/Test";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
  );
}

export default App;
