import React from "react";
import AdminRouter from "./routes/AdminRouter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>
    </Router>
  );
};

export default App;
