import { Link } from "react-router-dom";
import Toggle from "./Toggle";

export default function Navbar() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1rem 2rem', 
      background: 'var(--navbar-bg)',
      backdropFilter: 'blur(5px)',
      borderBottom: '1px solid var(--card-border)'
    }}>
      <div className="flex items-center space-x-4">
        <Link className="nav-link" to="/">🏠 Home</Link>
        <Link className="nav-link" to="/contacts">📇 Contacts</Link>
        <Link className="nav-link" to="/companies">🏢 Companies</Link>
        <Link className="nav-link" to="/deals">💰 Deals</Link>
        <Link className="nav-link" to="/tickets">🎫 Tickets</Link>
      </div>
      <Toggle />
    </div>
  );
}
