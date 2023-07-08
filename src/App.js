// import logo from './logo.svg';
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BusinessList from "./BusinessList";
import BusinessDetail from "./DetailBusiness";
import Navbar from "./navbar";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<BusinessList />} />
          <Route path="/business/:id" element={<BusinessDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
