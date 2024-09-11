import "./App.css";
import "@mantine/core/styles.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import Home from "./pages/home";
import Login from "./pages/login";

function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
