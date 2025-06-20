// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddItem from "./components/AddItems";
import ViewItems from "./components/ViewItems";
import NavBar from "./NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<ViewItems />} />
        <Route path="/add" element={<AddItem />} />
      </Routes>
    </Router>
  );
}

export default App;
