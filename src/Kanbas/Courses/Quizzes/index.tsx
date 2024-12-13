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
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addQuiz, setQuiz, deleteQuiz, setQuizzes, updateQuiz } from "./reducer";

export default function Quizzes() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [publishQuiz, setPublishedQuiz] = useState([]);

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
    availability: "",
    available: new Date().toISOString(),
    availableUntil: new Date().toISOString(),
    status: "unpublished",
	});

  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
      setPublishedQuiz(quizzes);
      dispatch(setQuizzes(quizzes));
  };

  const getAvailabilityStatus = (quiz: any) => {
    const now = new Date();
    const availableDate = new Date(quiz.available);
    const availableUntil = new Date(quiz.availableUntil);

    if (now < availableDate) return `Not available until ${quiz.available}`;
    if (now > availableUntil) return "Closed";
    return "Available";
  };

  // const togglePublish = (quizId: string) => {
  //   const updatedQuiz = quizzes.find((quiz: any) => quiz._id === quizId);
  //   updatedQuiz.published = !updatedQuiz.published;
  //   dispatch(updateQuiz(updatedQuiz));
  // };

  const togglePublish = (quizId: string) => {
    // Toggle publish/unpublish state for the quiz
    const updatedQuiz = quizzes.map((quiz: any) =>
      quiz._id === quizId ? { ...quiz, status: quiz.status === "unpublished" ? "published" : "unpublished" } : quiz
    );
    setPublishedQuiz(updatedQuiz);
    // Optionally, update the quiz on the backend as well
  };

  const handleAddQuiz = () => {
    dispatch(addQuiz(newQuiz));
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuiz._id}`);
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
            <button type="submit" className="btn btn-sm btn btn-outline-dark float-end me-1 wd-kanbas-save-profile btn-default">
            <IoEllipsisVertical className="fs-5 mt-1"
            data-bs-toggle="dropdown" aria-expanded="false" />     
        </button>
        <button type="submit" className="btn btn-md btn-danger float-end me-1 wd-kanbas-save-profile btn-danger" onClick={handleAddQuiz}>
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
              {quizzes.length === 0 ? (
            <div className="text-center text-muted">
              No quizzes yet. Click <b>+ Quiz</b> to create your first quiz!
            </div>
          ) : (

        <ul id="wd-quiz-list" className="list-group rounded-0">
            {quizzes.map((quiz: any) => (
            <li className="wd-quiz-list-item list-group-item p-3 ps-2 ">
         
            {currentUser?.role === "FACULTY" && (
            <div className="float-end">
            
            {quiz.published ? (
                      <GreenCheckmark />
                    ) : (
                      <span
                        onClick={() => togglePublish(quiz._id)}
                        style={{ cursor: "pointer", color: "red" }}
                      >
                        <FaBan />
                      </span>
                    )}
                      <IoEllipsisVertical
                      className="fs-5 me-2 dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    />
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          className="dropdown-item"
                          to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                        >
                          Edit
                        </Link>
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => dispatch(deleteQuiz(quiz._id))}
                        >
                          Delete
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => togglePublish(quiz._id)}
                        >
                          {quiz.published ? "Unpublish" : "Publish"}
                        </button>
                      </li>
                    </ul>

           
          </div>
          )}
          <div className="title-quizzes d-flex align-items-center">
            <RxRocket className="me-1 mt-1 fs-4" />
            <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`} className="wd-quiz-link text-decoration-none text-dark">
                  <h4>{quiz.title}</h4>
                </Link>
                </div>
                <div className="quiz-details mt-1 me-1">
                    <span><b>{getAvailabilityStatus(quiz)}</b></span> | 
                    <span> Due Date: {quiz.dueDate}</span> | 
                    <span> {quiz.points} pts</span> |
                    <span> {quiz.questions?.length || 0 } Questions</span>
                    {currentUser?.role === "STUDENT" && (
                    <>
                      | <span>Score: {quiz.score || "N/A"}</span>
                    </>
                  )}
                  </div>

           
          </li>
            ))}
          </ul>
          )}
        </ul>
        
 
      </div>
  );}
  