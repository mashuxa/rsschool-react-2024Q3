import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./components/App/App.tsx";
import "./index.css";
import Main from "./pages/Main/Main.tsx";
import ReactHookForm from "./pages/ReactHookForm/ReactHookForm.tsx";
import UncontrolledForm from "./pages/UncontrolledForm/UncontrolledForm.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Main />} />
          <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
          <Route path="/hook-form" element={<ReactHookForm />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
);
