import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsFillCaretDownFill } from "react-icons/bs";
import { RxRocket } from "react-icons/rx";
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
    _id: "123",
    course: "",
    title: "Sample Quiz",
    description: "Description",
    assignedTo: "Instructor",
    quiz_type: "Graded Quiz",
    points: 50,
    group: "Exams",
    shuffle_answers: "Yes",
    time_limit: "30",
    multiple_attempts: true,
    show_answers: "After completion",
    access_code: "1234",
    one_question: true,
    webcam: false,
    lock_questions: true,
    dueDate: new Date().toISOString(),
    available: new Date().toISOString(),
    availableUntil: new Date().toISOString(),
	});

  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
      dispatch(setQuizzes(quizzes));
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  console.log(cid);

    return (
       
      <div id="wd-quizzes">
       <input id="wd-search-quizzes" className="form-control w-25 float-start"
               placeholder="Search for Quiz" />

    {currentUser?.role === "FACULTY" && (
        

        <Link to={`/Kanbas/Courses/${cid}/Quizzes/new`}>
            <button type="submit" className="btn btn-sm btn btn-outline-dark float-end me-1 wd-kanbas-save-profile btn-default">
            <IoEllipsisVertical className="fs-5 mt-1" />     
        </button>
        <button type="submit" className="btn btn-md btn-danger float-end me-1 wd-kanbas-save-profile btn-danger">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Quiz
        </button>
        
        </Link>
    )}
          <br/><br/><br/>

        <ul id="wd-quizzes" className="list-group rounded-0">
          <li className="wd-quizzes-title list-group-item p-0 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">   
              <div className="dropdown d-inline me-1 float-left">
              <BsFillCaretDownFill />
              Assignment Quizzes
              </div>
          
            </div>
            </li>

        <ul id="wd-quiz-list" className="list-group rounded-0">
            {quizzes.map((quiz: any) => (
            <li className="wd-quiz-list-item list-group-item p-3 ps-2 ">
            <RxRocket className="me-1 fs-4" />
            {currentUser?.role === "FACULTY" && (
            <div className="float-end">
                <FaTrash className="text-danger me-3 mt-1 fs-5" onClick={(e) =>{e.preventDefault();
                const confirmDelete = window.confirm("Are you sure you want to delete this quiz?");
                if(confirmDelete) {
                    dispatch(deleteQuiz(quiz._id));
                }
            }} /> 
            <GreenCheckmark />
           
          </div>
          )}
        
            <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`} className="wd-quiz-link text-decoration-none text-dark">
                  {quiz.title}
                </Link>

                <div className="quiz-details">
                    {/* <p>Availability: {getAvailabilityText(quiz)}</p> */}
                    <p>Due Date: {quiz.dueDate}</p>
                    <p>Points: {quiz.points}</p>
                    <p>Questions: {quiz.questions.length}</p>
                    <p>Score: {quiz.score || "N/A"}</p>
                  </div>
            
            <div className="mt-1">
              {/* {quiz.description} */}
              <span className="text-danger me-1">Multiple Modules</span> | <span className="me-1"> Not available until {quiz.availableUntil} at 12:00am</span> |
              <span className="me-1"> Due {quiz.dueDate} at 11:59pm</span> | <span className="me-1"> {quiz.points} points</span>
            </div>

            {/* <LessonControlButtons/>  */}
           
          </li>
            ))}
          </ul>
        </ul>
        
 
      </div>
  );}
  