import { IoEllipsisVertical } from "react-icons/io5";
import { BsCheckCircle, BsCircle } from "react-icons/bs";
import { FaTrash, FaBan } from "react-icons/fa";
import { Link, useNavigate} from "react-router-dom";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addQuestion, updateQuestion, setQuestion, deleteQuestion, setQuestions } from "./questionReducer";

export default function TrueFalseEditor() {
    const { cid, qid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { questions } = useSelector((state: any) => state.questionReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [question, setQuestion] = useState({
        _id: "1",
        title: "True/False",
        points: 3,
        question_text:"Is it true that 2+2=4?",
        answer:""
      })
    
    const handleUpdateQuestion = async () => {
        const updatedQuestion = { ...question, text: question.question_text };
        dispatch(updateQuestion(updatedQuestion));
    };

    const toggleAnswer = () => {
        const updatedQuestion = { ...question, answer: !question.answer };
        dispatch(updateQuestion(updatedQuestion));
      };

      const handleDelete = () => {
        dispatch(deleteQuestion(question._id));
      };

      const handleSave = () => {
        dispatch(updateQuestion(question));
      }

    return (
        <div className="true-false-editor border rounded p-3 mb-2">
        <div className="d-flex justify-content-between align-items-center mb-2">
        <input 
            type="text"
            className="form-control"
            placeholder=""
            value={question.question_text}
            onChange={(e) => setQuestion({...question, question_text: e.target.value})}
            />

            <input 
            type="text"
            className="form-control"
            placeholder=""
            value={question.answer}
            />

            <input
                type="number"
                className="form-control"
                value={question.points}
                onChange={(e) =>
                  setQuestion({ ...question, points: parseInt(e.target.value, 3)})
                }
              />
        
          <input
            type="text"
            className="form-control"
            placeholder="Enter your question"
            value={question.question_text}
            onChange={handleUpdateQuestion}
          />
          <div className="dropdown">
            <IoEllipsisVertical
              className="fs-5 ms-2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ cursor: "pointer" }}
            />
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleDelete}
                >
                  <FaTrash /> Delete
                </button>
              </li>
            </ul>
          </div>
        </div>
  
        <div className="d-flex align-items-center">
          <button
            className={`btn me-2 ${question.answer ? "btn-success" : "btn-outline-secondary"}`}
            onClick={toggleAnswer}
          >
            {question.answer ? <BsCheckCircle /> : <BsCircle />} True
          </button>
  
          <button
            className={`btn ${!question.answer ? "btn-danger" : "btn-outline-secondary"}`}
            onClick={toggleAnswer}
          >
            {question.answer ? <BsCircle /> : <BsCheckCircle />} False
          </button>

          
        </div>

        <div className="d-flex justify-content-end">
        <button className="btn btn-light w-40" type="button" id="wd-cancel">
            <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/`}>Cancel</Link>
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          Update Question
        </button>
        </div>
      </div>
    );

}