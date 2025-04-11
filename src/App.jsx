import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TwoFA from "./pages/TwoFA";
import Dashboard from "./pages/Dashboard";
import OnboardCustomer from "./pages/onboardCustomer";
import RegisterAgent from "./pages/RegisterAgent";
import LoginAgent from "./pages/LoginAgent";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import BillPayment from "./pages/BillPayment";
import Receiptpage from "./pages/Receiptpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/2fa" element={<TwoFA />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/onboard" element={<OnboardCustomer />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/bill-payments" element={<BillPayment />} />
          <Route path="/receipt/:id" element={<Receiptpage />} />
          <Route path="/reports" element={<Reports />} />
        </Route>

        {/* <Route path="/onboard" element={<OnboardCustomer />} />
        <Route path="/register" element={<RegisterAgent />} />
        <Route path="/login" element={<LoginAgent />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
