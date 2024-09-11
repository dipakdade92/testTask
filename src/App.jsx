import "./App.css";
import "@mantine/core/styles.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import Home from "./pages/home";
import Login from "./pages/login";
import ProtectedRoute from "./protectedRoute";
import AddEditCompany from "./pages/addCompany";

function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Protected Route: If not authenticated, redirects to login */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-edit"
            element={
              <ProtectedRoute>
                <AddEditCompany />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
