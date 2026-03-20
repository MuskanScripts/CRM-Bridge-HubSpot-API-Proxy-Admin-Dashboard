import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './Toggle.css';

const Toggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      className={`toggle-button ${theme}`}
      onClick={toggleTheme}
    >
      <span className="toggle-icon sun">☀️</span>
      <span className="toggle-icon moon">🌙</span>
      <span className="toggle-slider"></span>
    </button>
  );
};

export default Toggle;
