import TOC from "./TOC";
import { Route, Routes, Navigate } from "react-router";
import { Provider } from "react-redux";


export default function LandingPage() {
  return (
    <div id="wd-project">
      <h1>TEAM WEB</h1>
      <h2>Jiajie He CS 5610 Section 20593 </h2>
      <h3>Jenny Nguyen CS 5610 Section 20593</h3>
    
      <TOC />
      <Routes>
        <Route path="/" element={<Navigate to="LandingPage" />} />
      </Routes>
    </div>

);}
