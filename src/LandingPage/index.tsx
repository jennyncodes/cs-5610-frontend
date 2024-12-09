import TOC from "./TOC";
import { Route, Routes, Navigate } from "react-router";
import { Provider } from "react-redux";
import "../main.css";
import { FaGithub } from "react-icons/fa";


export default function LandingPage() {
  return (
    <div className="container">
        <div className="header d-flex align-items-center sticky-top">

            <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
                <h1 className="sitename">TeamWeb.</h1>
            </div>
        </div>
        <TOC />
        <Routes>
            <Route path="/" element={<Navigate to="LandingPage" />} />
        </Routes>

        <div className="about section">
            <div className="container">
                <div className="container-fluid container-md d-flex align-items-center justify-content-between">
                <div className="team">
                  <h3 className="">
                    <a href="#"><span className="">Jiajie</span> He</a>
                  </h3>
                  <span className="d-block position">CS 5610, Section 20593 </span>
                  <ul className="list-unstyled social-icons light mb-3">
                        <li>
                            <a href="https://github.com/jiajie-he"><FaGithub /></a>
                        </li>
                    </ul>
                </div>

                <div className="team">
                    <h3 className="">
                        <a href="#"><span className="">Jenny</span> Nguyen</a>
                    </h3>
                    <span className="d-block position">CS 5610, Section 20593 </span>

                    <ul className="list-unstyled social-icons light mb-3">
                        <li>
                            <a href="https://github.com/jennyncodes"><FaGithub /></a>
                        </li>
                    </ul>

                </div>

                </div>
            </div>
        </div>

    </div>

);}
