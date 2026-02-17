import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{ padding: "10px", background: "#eee" }}>
      <Link to="/">🏠 Home</Link> |{" "}
      <Link to="/contacts">Contacts</Link> |{" "}
      <Link to="/companies">Companies</Link> |{" "}
      <Link to="/deals">Deals</Link> |{" "}
      <Link to="/tickets">Tickets</Link>
    </div>
  );
}
