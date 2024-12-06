import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsFillCaretDownFill } from "react-icons/bs";
import { LuFileEdit } from "react-icons/lu";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate} from "react-router-dom";
import { useParams } from "react-router";
import * as coursesClient from "../client";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addQuiz, setQuiz, deleteQuiz, setQuizzes, updateQuiz } from "./reducer";

export default function Quizzes() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const newQuiz = ({
	
	});

  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
      dispatch(setQuizzes(quizzes));
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

    return (
       
      <div id="wd-quizzes">
       <input id="wd-search-quizzes" className="form-control w-25 float-start"
               placeholder="Search for Quiz" />

    {currentUser?.role === "FACULTY" && (

        <Link to={`/Kanbas/Courses/${cid}/Quizzes/new`}>
        <button type="submit" className="btn btn-md btn-danger float-end me-1 wd-kanbas-save-profile btn-danger">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Quiz
        </button>
        </Link>
    )}

        <ul id="wd-quiz-list" className="list-group rounded-0">
          {quizzes.map((quiz: any) => (
          <li className="wd-quiz-list-item list-group-item p-3 ps-2 ">
          <BsGripVertical className="me-2 fs-3" />
          
          <LuFileEdit className="me-2 fs-4 text-success" />
          {currentUser?.role === "FACULTY" && (
          <div className="float-end">
            <FaTrash className="text-danger me-3 mt-1 fs-5" onClick={(e) =>{e.preventDefault();
              const confirmDelete = window.confirm("Are you sure you want to delete this quiz?");
              if(confirmDelete) {
                dispatch(deleteQuiz(quiz._id));
              }
            }} /> 
            <GreenCheckmark />
            <IoEllipsisVertical className="me-2 mt-1 fs-5" />     
          </div>
          )}
          {currentUser?.role === "STUDENT" && (
              <Link to={`/Kanbas/Courses/${cid}/Quizzes/`} 
              className="wd-quiz-link text-decoration-none text-dark">
              {quiz.title}
            </Link>
          )}
            {currentUser?.role === "FACULTY" && (
            <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`} 
              className="wd-quiz-link text-decoration-none text-dark"
             >
              {quiz.title}
            </Link>
            )}
            <div className="mt-1">
              {/* {quiz.description} */}
              <span className="text-danger me-1">Multiple Modules</span> | <span className="me-1"> Not available until {quiz.availableUntil} at 12:00am</span> |
              <span className="me-1"> Due {quiz.dueDate} at 11:59pm</span> | <span className="me-1"> {quiz.points} points</span>
            </div>

            {/* <LessonControlButtons/>  */}
           
          </li>
            ))}
          </ul>
        
 
      </div>
  );}
  