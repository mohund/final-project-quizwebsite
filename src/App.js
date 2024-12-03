import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Quiz from "./component/Quiz";
import About from "./component/About";
import Nav from "./component/Nav";

const App = () => {
  return (
    <Router basename="/final-project-quizwebsite">
      <div className="container">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
