import React from "react";
import {BrowserRouter as Router,Route,Routes,Link,Navigate,
} from "react-router-dom";
import Home from "./component/Home";
import Quiz from "./component/Quiz";
import About from "./component/About";

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
