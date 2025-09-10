import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import chefLogo from "../assets/chef-claude-icon1.png";
import "../styles/HeaderStyle.css";

export default function HeaderSection() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);
  };

  return (
    <header>
      <nav className="nav-container">
        <div className="center-items">
          <img src={chefLogo} alt="nav-logo" />
          <h1>Chef Claude</h1>
        </div>

        <button className="theme-toggle-btn" onClick={toggleTheme}>
          <div className="icon-wrapper">
            <Sun className={`icon sun ${darkMode ? "hide" : "show"}`} />
            <Moon className={`icon moon ${darkMode ? "show" : "hide"}`} />
          </div>
        </button>
      </nav>
    </header>
  );
}
