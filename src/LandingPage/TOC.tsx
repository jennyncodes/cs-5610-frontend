import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "../main.css";

export default function TOC() {
  const { pathname } = useLocation();
    return (
        <div className="navmenu">
            <nav id="navmenu" className="navmenu">
        <ul className="nav nav-pills">
            <li className="nav-item">
                <a id="wd-a" href="#/LandingPage" className="nav-link">
                Home
                </a>
            </li>

            <li className="nav-item">
                <a id="wd-k" href="#/Kanbas" className="nav-link">
                Kanbas
                </a>
            </li>
            <li className="dropdown"><a href="#"><span>Github Project</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                <ul>
                    <li><a href="https://github.com/jennyncodes/cs-5610-frontend">React.js Project</a>
                    </li>
                        <li className="dropdown">
                            <a href="https://github.com/jennyncodes/cs-5610-server"><span>Node.js</span> 
                            <i className="bi bi-chevron-down toggle-dropdown"></i>
                            </a>
                        </li>
                </ul>
            </li>
    

          </ul>
          </nav>
        </div>

  );
}