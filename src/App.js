// import { useRef } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "./react-router-dom";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return <div>home</div>;
}
function Setting() {
  return <div>setting</div>;
}
function App() {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/home/200">home</Link>
        </li>
        <li>
          <Link to="/setting">setting </Link>
        </li>
      </ul>

      <Routes>
        <Route
          path="/"
          element={() => {
            return <div>1111</div>;
          }}
        ></Route>
        <Route path="/home/:id" element={Home}></Route>
        <Route path="/setting" element={<Setting></Setting>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
