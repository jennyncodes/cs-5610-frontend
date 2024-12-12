import { IoEllipsisVertical } from "react-icons/io5";
import { BsCheckCircle, BsCircle } from "react-icons/bs";
import { FaTrash, FaBan } from "react-icons/fa";
import { Link, useNavigate} from "react-router-dom";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addQuestion, editQuestion, selectQuestion, deleteQuestion, setQuestions } from "./questionReducer";

export default function TrueFalseEditor() {
    const { cid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { questions } = useSelector((state: any) => state.questionReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [question, setQuestion] = useState({
        _id: "1",
        title: "New Assignment",
        points: "3",
        question_text:"",
        choices: "",
        answer:""
      })
    
    const handleTextChange = async () => {
        const updatedQuestion = { ...question, text: question.question_text };
        dispatch(editQuestion(updatedQuestion));
    };

    const toggleAnswer = () => {
        const updatedQuestion = { ...question, answer: !question.answer };
        dispatch(editQuestion(updatedQuestion));
      };

      const handleDelete = () => {
        dispatch(deleteQuestion(question._id));
      };

    return (
        <div className="true-false-editor border rounded p-3 mb-2">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter your question"
            value={question.question_text}
            onChange={handleTextChange}
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
      </div>
    );

}