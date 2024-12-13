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
import TrueFalseEditor from "./TrueFalseEditor";

export default function Questions() {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [activeTab, setActiveTab] = useState("questions");

    return (
       
    <div className="wd-questions-quizzes">
        <Link to={`/Kanbas/Courses/${cid}/Assignments/${qid}/QuizQuestion/new`}>
        <button type="submit" className="btn btn-md btn-danger float-end me-1 wd-kanbas-save-profile btn-danger"
        >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          New Question
        </button>
        </Link>

        <TrueFalseEditor/>
        <h1>Hello</h1>
      

 
    </div>
  );}
  