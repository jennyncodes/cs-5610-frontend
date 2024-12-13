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
import { addQuestion, updateQuestion, deleteQuestion, setQuestion, setQuestions } from "./questionReducer";
import { addQuiz, deleteQuiz, setQuizzes, updateQuiz } from "./reducer";
import TrueFalseEditor from "./TrueFalseEditor";

export default function QuizPreview() {
  const { cid, qid, quid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions } = useSelector((state: any) => state.questionReducer);
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState("");
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [previousAnswers, setPreviousAnswers] = useState(null);

  const fetchQuestions = async () => {
    const questions = await coursesClient.findQuestionsForQuiz(cid as string, qid as string);
      dispatch(setQuestions(questions));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

    return (
    <div className="quiz-preview">
  


      <div id="wd-questions">
      {/* <h2>Quiz Preview: {quiz.title}</h2> */}
        
  
          <br/><br/><br/>

          <ul id="wd-questions" className="list-group rounded-0">

          {quizzes.map((quiz: any) =>
          
          <ul id="wd-question-list" className="list-group rounded-0">
          
    
            <li key ={quiz._id} className="wd-question-list-item list-group-item p-3 ps-2 ">
              <div className="title-questions d-flex align-items-center">

                  <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions/${quiz._id}`} className="wd-quiz-link text-decoration-none text-dark">
                    <h4>{quiz.title}</h4>
                  </Link>
                </div>
                <div className="question-details mt-1 me-1">
                {/* <span> {quiz.type} Question</span> |
                <span> {quiz.points} pts</span> | */}
                </div>
    
    
          </li>
           
          </ul>
        )}
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
  