import "./App.css";
import { Routes, Route } from "react-router-dom";
import Test from "./pages/Home/Test";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
