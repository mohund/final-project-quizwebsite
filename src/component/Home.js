import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <header className="hero">
        <h1>Welcome to Trivia Quizzes</h1>
        <p>Challenge yourself and test your knowledge in various categories!</p>
        <Link to="/quiz" className="cta-button">
          Start Now
        </Link>
      </header>

      <section className="categories">
        <h2>Quiz Categories</h2>
        <div className="category-list">
          <div className="category-item">
            <h3>General Knowledge</h3>
            <p>Test your everyday knowledge!</p>
          </div>
          <div className="category-item">
            <h3>Science</h3>
            <p>Explore the wonders of the scientific world.</p>
          </div>
          <div className="category-item">
            <h3>Movies</h3>
            <p>How well do you know your favorite films?</p>
          </div>
          <div className="category-item">
            <h3>History</h3>
            <p>Discover the past and learn about history.</p>
          </div>
          <div className="category-item">
            <h3>Sports</h3>
            <p>How much do you know about your favorite sports?</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Trivia Quizzes. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
