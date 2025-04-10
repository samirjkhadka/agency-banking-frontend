import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TwoFA from "./pages/TwoFA";
import Dashboard from "./pages/Dashboard";
import OnboardCustomer from "./pages/onboardCustomer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/2fa" element={<TwoFA />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboard" element={<OnboardCustomer />} />
      </Routes>
    </Router>
  );
}

export default App;
