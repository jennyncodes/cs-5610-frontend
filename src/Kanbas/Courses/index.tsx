import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import PeopleTable from "./People/Table";
import AssignmentEditor from "./Assignments/Editor";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import Quizzes from "./Quizzes";
import QuizDisplayEditor from "./Quizzes/QuizDetailEditor";
import Questions from "./Quizzes/Questions";
import QuizDetails from "./Quizzes/QuizDetails";


export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  
    return (
      <div id="wd-courses">
         <h2 className="text-danger">
      <FaAlignJustify className="me-4 fs-4 mb-1" />
       {course && course.name} &gt; {pathname.split("/")[4]}
       </h2>
      <div className="d-flex">
    <div className="d-none d-md-block">

            <CoursesNavigation />
            </div>
            <div className="flex-fill">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home />} />
              <Route path="Home" element={<h2>Home</h2>} />
              <Route path="Modules" element={<Modules />} /> 
              <Route path="Assignments" element={<Assignments/>} />
              <Route path="Assignments/:aid" element={<AssignmentEditor />} />
              <Route path="Quizzes" element={<Quizzes/>} />
              <Route path="Quizzes/:qid" element={<QuizDisplayEditor/>} />
              <Route path="Quizzes/:qid/QuizDetails" element={<QuizDetails/>}/>
              <Route path="Quizzes/:qid/Questions" element={<Questions/>}/>
              <Route path="People" element={<PeopleTable/>} />
            </Routes>
            </div></div>

      </div>
  );}
  