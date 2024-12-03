import React, { useState, useEffect } from "react";
import "./Quiz.css";
import JSConfetti from "js-confetti";
const Quiz = () => {
  const [settings, setSettings] = useState({
    amount: 10,
    category: "",
    difficulty: "",
  });
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    if (showScore && score === questions.length) {
      const jsConfetti = new JSConfetti();
      jsConfetti
        .addConfetti({
          emojis: ["🎉", "✨", "🎈", "💥"],
        })
        .then(() => {
          setShowCongrats(true);
        });
    }
  }, [showScore, score, questions.length]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const url = `https://opentdb.com/api.php?amount=${settings.amount}&category=${settings.category}&difficulty=${settings.difficulty}&type=multiple`;
      const response = await fetch(url);
      const data = await response.json();

      const formattedQuestions = data.results.map((q) => ({
        question: q.question,
        options: [...q.incorrect_answers, q.correct_answer].sort(
          () => Math.random() - 0.5
        ),
        answer: q.correct_answer,
      }));

      setQuestions(formattedQuestions);
      setQuizStarted(true);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
    }
  };

  // Timer Logic
  useEffect(() => {
    if (!quizStarted || showScore) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          handleNextQuestion();
          return 30;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, showScore, currentQuestion]);

  const handleAnswer = (option) => {
    setSelectedOption(option);
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelectedOption(null);
      handleNextQuestion();
    }, 2000);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(30); // Reset timer
    } else {
      setShowScore(true);
    }
  };

  if (!quizStarted) {
    return (
      <div className="settings">
        <h1>Quiz Settings</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchQuestions();
          }}
        >
          <label>
            Number of Questions:
            <input
              type="number"
              value={settings.amount}
              onChange={(e) =>
                setSettings({ ...settings, amount: e.target.value })
              }
              min="1"
              max="15"
            />
          </label>
          <br />
          <label>
            Category:
            <select
              value={settings.category}
              onChange={(e) =>
                setSettings({ ...settings, category: e.target.value })
              }
            >
              <option value="">Random</option>
              <option value="9">General Knowledge</option>
              <option value="11">Movies</option>
              <option value="17">Science & Nature</option>
              <option value="21">Sports</option>
              <option value="23">History</option>
            </select>
          </label>
          <br />
          <label>
            Difficulty:
            <select
              value={settings.difficulty}
              onChange={(e) =>
                setSettings({ ...settings, difficulty: e.target.value })
              }
            >
              <option value="">Random</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <br />
          <button type="submit">Start Quiz</button>
        </form>
      </div>
    );
  }

  if (loading) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="quiz">
      {showScore ? (
        <div className="score">
          <h1>Your Score</h1>
          <p>
            {score} / {questions.length}
          </p>
          {score === questions.length && (
            <>
              <p>Congratulations! 🎉</p>
              {showCongrats && (
                <p style={{ color: "green", fontWeight: "bold" }}>
                  You've achieved a perfect score! 🏆
                </p>
              )}
            </>
          )}
        </div>
      ) : (
        <div>
          <h2>
            Question {currentQuestion + 1} / {questions.length}
          </h2>
          <h3>Time Left: {timeLeft} seconds</h3>
          <h1
            dangerouslySetInnerHTML={{
              __html: questions[currentQuestion].question,
            }}
          />
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => {
              let buttonClass = "";
              if (selectedOption === option) {
                buttonClass =
                  option === questions[currentQuestion].answer
                    ? "correct"
                    : "incorrect";
              } else if (
                option === questions[currentQuestion].answer &&
                selectedOption
              ) {
                buttonClass = "correct";
              }

              return (
                <button
                  key={index}
                  className={buttonClass}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedOption !== null}
                  dangerouslySetInnerHTML={{ __html: option }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
