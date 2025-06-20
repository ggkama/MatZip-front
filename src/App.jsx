import "./App.css";
import { Routes, Route } from "react-router-dom";
import Test from "./pages/Home/Test";

function App() {
  return (
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
=======
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
    </AuthProvider>
>>>>>>> ad816b0a64a5b46351add3094705b1d1f17a312d
  );
}

export default App;
