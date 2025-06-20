// src/components/NavBar.jsx
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <Link to="/">View Items</Link>
      <Link to="/add">Add Item</Link>
    </nav>
  );
}
