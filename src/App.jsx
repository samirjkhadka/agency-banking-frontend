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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/2fa" element={<TwoFA />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/onboard"
          element={
            <PrivateRoute>
              <Layout>
                <OnboardCustomer />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <Layout>
                <Transactions />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Layout>
                <Reports />
              </Layout>
            </PrivateRoute>
          }
        />
        {/* <Route path="/onboard" element={<OnboardCustomer />} />
        <Route path="/register" element={<RegisterAgent />} />
        <Route path="/login" element={<LoginAgent />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
