import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsFillCaretDownFill } from "react-icons/bs";
import { RxRocket } from "react-icons/rx";
import { LuFileEdit } from "react-icons/lu";
import { FaTrash, FaBan } from "react-icons/fa";
import { Link, useNavigate} from "react-router-dom";
import { useParams } from "react-router";
import * as coursesClient from "../client";
import * as quizClient from "./client";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addQuestion, updateQuestion, deleteQuestion, setQuestions } from "./questionReducer";
import TrueFalseEditor from "./TrueFalseEditor";

export default function Questions() {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions } = useSelector((state: any) => state.questionReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [activeTab, setActiveTab] = useState("questions");

  const newQuestion = {
    _id: "",
    question: "",
    type: "MC",
    points: 3,
    answer: "",
    correct_answer:"",
  };

  const handleAddQuestion = () => {
    dispatch(addQuestion(newQuestion));
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions/${newQuestion._id}`);
  };


  const fetchQuestions = async () => {
    const questions = await coursesClient.findQuestionsForQuiz(cid as string, qid as string);
      dispatch(setQuestions(questions));
  };

  const handleDetailsButton = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuizDetails`);
  };

  const handleQuestionButton = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions`);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

    return (
      <div id="wd-question-editor">
        <div className="tabs">
        <button type="submit" 
          className={activeTab === "details" ? "active" : ""}
          onClick={handleDetailsButton}>
          Details
        </button>
        <button type="submit" 
         className={activeTab === "questions" ? "active" : ""}
        onClick={handleQuestionButton}>Questions</button>
        
      </div>

      <div id="wd-assignments">
  
         {currentUser?.role ==="FACULTY" && (
          
        <button type="submit" className="btn btn-md btn-danger float-end me-1 wd-kanbas-save-profile btn-danger"
          onClick={handleAddQuestion}>
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          New Question
        </button>

        )
        } 
       
     

          <br/><br/><br/>

          <ul id="wd-questions" className="list-group rounded-0">
        
        
          <ul id="wd-question-list" className="list-group rounded-0">
          {questions.map((question: any) => (
          <li key ={question._id} className="wd-question-list-item list-group-item p-3 ps-2 ">
          <BsGripVertical className="me-2 fs-3" />
          
          <LuFileEdit className="me-2 fs-4 text-success" />
          {currentUser?.role === "FACULTY" && (
          <div className="float-end">
            <FaTrash className="text-danger me-3 mt-1 fs-5" onClick={(e) =>{e.preventDefault();
              const confirmDelete = window.confirm("Are you sure you want to delete this assignment?");
              if(confirmDelete) {
                dispatch(deleteQuestion(question._id));
              }
            }} /> 
            <GreenCheckmark />
            <IoEllipsisVertical className="me-2 mt-1 fs-5" />     
          </div>
          )}
       
              <Link to={`/Kanbas/Courses/${cid}/Quizzes/`} 
              className="wd-assignment-link text-decoration-none text-dark">
              {question.title}
            </Link>
    
   
            <Link to={`/Kanbas/Courses/${cid}/Quizzes/${question._id}`} 
              className="wd-assignment-link text-decoration-none text-dark"
             >
              {question.title}
            </Link>

            <div className="mt-1">
     
              <span className="text-danger me-1">Multiple Modules</span> | <span className="me-1"> Not available until {question.availableUntil} at 12:00am</span> |
              <span className="me-1"> Due {question.dueDate} at 11:59pm</span> | <span className="me-1"> {question.points} points</span>
            </div>
           
          </li>
            ))}
          </ul>
        

         </ul>
 
      </div>


{/*        
    <div className="wd-questions-quizzes">
        <Link to={`/Kanbas/Courses/${cid}/Assignments/${qid}/QuizQuestion/QuizQuestionsEditor`}>
        <button type="submit" className="btn btn-md btn-danger float-end me-1 wd-kanbas-save-profile btn-danger"
        >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          New Question
        </button>
        </Link>
    
 
    </div> */}
    </div>
  );}
  