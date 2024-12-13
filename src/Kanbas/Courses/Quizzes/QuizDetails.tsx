import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000"; 
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export default function QuizDetails() {
  const { quizId } = useParams(); 
  const [quizDetails, setQuizDetails] = useState<any>({
    title: "Loading Quiz...",
    quizType: "N/A",
    points: 0,
    assignmentGroup: "N/A",
    shuffleAnswers: false,
    timeLimit: "N/A",
    multipleAttempts: false,
    howManyAttempts: 0,
    showCorrectAnswers: "N/A",
    accessCode: "N/A",
    oneQuestionAtATime: false,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "N/A",
    availableDate: "N/A",
    untilDate: "N/A",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fallbackData = {
    title: "Quiz 1 - Foundations",
    quizType: "Graded Quiz",
    points: 20,
    assignmentGroup: "QUIZZES",
    shuffleAnswers: true,
    timeLimit: "45 Minutes",
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: "After Due Date",
    accessCode: "ALGO2024",
    oneQuestionAtATime: false,
    webcamRequired: false,
    lockQuestionsAfterAnswering: true,
    dueDate: "Dec 15 at 11:59 PM",
    availableDate: "Dec 10 at 8:00 AM",
    untilDate: "Dec 15 at 11:59 PM",
  };

  useEffect(() => {
    const fetchQuizDetails = async () => {
      console.log("Starting fetchQuizDetails...");
      const timeoutId = setTimeout(() => {
        console.log("Fetch timed out, using fallback data.");
        setError("Failed to load quiz details in time. Displaying fallback data.");
        setQuizDetails(fallbackData);
        setLoading(false);
      }, 5000); 

      try {
        if (!quizId) {
          throw new Error("Quiz ID is missing.");
        }

        console.log(`Fetching quiz details for quizId: ${quizId}`);
        setLoading(true);
        setError(null);

        const response = await axios.get(`${QUIZZES_API}/${quizId}`);
        clearTimeout(timeoutId); 
        console.log("Fetched Quiz Data:", response.data); 
        setQuizDetails(response.data);
      } catch (err) {
        clearTimeout(timeoutId); 
        console.error("Error fetching quiz details:", err);
        // setError("Fall back data used. Failed to load quiz details.");
        setQuizDetails(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, [quizId]);

  if (loading) {
    return (
      <div className="container my-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2>{quizDetails.title}</h2>
      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Quiz Type</th>
            <td>{quizDetails.quizType}</td>
          </tr>
          <tr>
            <th>Points</th>
            <td>{quizDetails.points}</td>
          </tr>
          <tr>
            <th>Assignment Group</th>
            <td>{quizDetails.assignmentGroup}</td>
          </tr>
          <tr>
            <th>Shuffle Answers</th>
            <td>{quizDetails.shuffleAnswers ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th>Time Limit</th>
            <td>{quizDetails.timeLimit}</td>
          </tr>
          <tr>
            <th>Multiple Attempts</th>
            <td>{quizDetails.multipleAttempts ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th>How Many Attempts</th>
            <td>{quizDetails.howManyAttempts}</td>
          </tr>
          <tr>
            <th>Show Correct Answers</th>
            <td>{quizDetails.showCorrectAnswers}</td>
          </tr>
          <tr>
            <th>Access Code</th>
            <td>{quizDetails.accessCode || "None"}</td>
          </tr>
          <tr>
            <th>One Question at a Time</th>
            <td>{quizDetails.oneQuestionAtATime ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th>Webcam Required</th>
            <td>{quizDetails.webcamRequired ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th>Lock Questions After Answering</th>
            <td>{quizDetails.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th>Due Date</th>
            <td>{quizDetails.dueDate}</td>
          </tr>
          <tr>
            <th>Available Date</th>
            <td>{quizDetails.availableDate}</td>
          </tr>
          <tr>
            <th>Until Date</th>
            <td>{quizDetails.untilDate}</td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary mx-2">Preview</button>
        <button className="btn btn-primary">Edit</button>
      </div>
    </div>
  );
}
