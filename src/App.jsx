import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TwoFA from "./pages/TwoFA";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/2fa" element={<TwoFA />} />
      </Routes>
    </Router>
  );
}

export default App;
