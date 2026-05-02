import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import TripPlanner from "./pages/TripPlanner";
import AIAssistant from "./pages/AIAssistant";
import TodoList from "./pages/TodoList";
import Navigation from "./components/Navigation";
import GooeyGradientBackground from "./components/GooeyGradientBackground";
import { useLocation } from "react-router-dom";

function App() {
  const { loading } = useAuth();
  const location = useLocation();
  const showNav = !["/", "/login"].includes(location.pathname);

  if (loading) {
    return (
      <GooeyGradientBackground>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '48px', height: '48px', borderRadius: '9999px', margin: '0 auto 1rem',
                border: '2px solid rgba(255,255,255,0.08)',
                borderTopColor: '#7c3aed',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)' }}>Loading…</p>
          </div>
        </div>
      </GooeyGradientBackground>
    );
  }

  return (
    <GooeyGradientBackground>
      {showNav && <Navigation />}
      <Routes>
        <Route path="/"      element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home"  element={<Home />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/plan"
          element={
            <ProtectedRoute>
              <TripPlanner />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trip"
          element={
            <ProtectedRoute>
              <TripPlanner />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assistant"
          element={
            <ProtectedRoute>
              <AIAssistant />
            </ProtectedRoute>
          }
        />

        <Route
          path="/todo"
          element={
            <ProtectedRoute>
              <TodoList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </GooeyGradientBackground>
  );
}

export default App;