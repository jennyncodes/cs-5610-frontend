import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function TOC() {
  const { pathname } = useLocation();
    return (
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
      <li className="nav-item">
        <a id="wd-k" href="https://github.com/jennyncodes/cs-5610-frontend" className="nav-link">
          React.js Github Project
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-k" href="https://github.com/jennyncodes/cs-5610-server" className="nav-link">
          Node.js Github Project
        </a>
      </li>
    </ul>
  );
}