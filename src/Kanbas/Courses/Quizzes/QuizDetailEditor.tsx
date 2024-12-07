import { Link, useNavigate} from "react-router-dom";
import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import { addQuiz, setQuiz, deleteQuiz, setQuizzes, updateQuiz } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as quizzesClient from "./client";
import * as coursesClient from "../client";


export default function QuizDisplayEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const {quizzes} = useSelector((state: any) => state.quizzesReducer)
  console.log(quizzes);
  const [activeTab, setActiveTab] = useState("details");
  const [quiz, setQuiz] = useState({
    _id:"",
    course:"",
      title: "Unnamed Quiz",
      description: "",
      assignedTo: "",
      quiz_type: "",
      points: "",
      group: "",
      shuffle_answers: "",
      time_limit: "",
      multiple_attempts: "",
      show_answers: "",
      access_code: "",
      one_question: "",
      webcam: "",
      lock_questions: "",
      dueDate: new Date().toISOString().slice(0, 16),
      available: new Date().toISOString().slice(0, 16),
      availableUntil: new Date().toISOString().slice(0, 16),
  })

  useEffect(() => {
    if(qid === "new") {

    } else {
      const q = quizzes.find((q:any)=> q._id === qid)
      if(q)
        setQuiz(q)
  }
  }, []);


    const saveQuiz = async () => {
      if (!cid) return;
      if(qid === "new") {
        await coursesClient.createQuizForCourse(cid, quiz).then((quiz) => {
          dispatch(addQuiz(quiz));
        })
      } else {
        await quizzesClient.updateQuiz(quiz)
        dispatch(updateQuiz(quiz));
      }
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    };
 

    return (

      <div id="wd-assignments-editor">
        <div className="tabs">
        <button
          className={activeTab === "details" ? "active" : ""}
          onClick={() => setActiveTab("details")}>
          Details
        </button>
        <button
          className={activeTab === "questions" ? "active" : ""}
          onClick={() => setActiveTab("questions")}>
          Questions
        </button>
      </div>

    <form>
        <br/>
        <input value={quiz.title} id="wd-title" className="form-control mb-2"
                 onChange={(e) => setQuiz({ ...quiz, title:  e.target.value })}/>
        
        <div className="mb-3">
          <div className="border p-3">
          <textarea value={quiz.description} className="form-control mb-2" id="wd-description"
             onChange={(e) => setQuiz({ ...quiz, description: e.target.value })} />

            <div className="row mb-3">
              <label htmlFor="wd-points" className="col-sm-2 col-form-label">
              Points</label>
              <div className="col-sm-10">
                <input value={quiz.points} id="wd-points" className="form-control mb-2"
                  onChange={ (e) => setQuiz({ ...quiz, points: (e.target.value) })}/>
              </div>
            </div>

            <div className="row mb-3">
          <label htmlFor="wd-submission-type" className="col-sm-2 col-form-label">Assign</label>
          <div className="col-sm-10">
            <div className="border p-3">
                <label htmlFor="wd-assign-to" className="col-sm-2 col-form-label">Assign to </label>
                <input onChange = {(e) => setQuiz({ ...quiz, assignedTo: e.target.value})} 
                  id="wd-assign-to" className="form-control mb-2" value="Everyone" />

                   
                    <label htmlFor="wd-due-date" className="col-sm-2 col-form-label">Due </label>
                    <div className="input-group mb-3">
                    <input onChange = {(e) => setQuiz({ ...quiz, dueDate: e.target.value})} 
                    type="date" id="wd-due-date" value="May 13, 2024, 11:59 PM" className="form-control"/><br/>
                    </div>

                    
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="wd-available-from" className="col-sm-3 col-form-label">Available from </label>
                        <div className="input-group mb-3">
                        <input onChange = {(e) => setQuiz({ ...quiz, available: e.target.value})}
                          type="date" id="wd-available-from" value="2024-5-06"  className="form-control mb-2"/>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <label htmlFor="wd-available-until" className="col-sm-3 col-form-label">Until </label>
                        <div className="input-group mb-3">
                        <input onChange = {(e) => setQuiz({ ...quiz, availableUntil: e.target.value})} 
                          type="date" id="wd-available-until" value={quiz.availableUntil} className="form-control mb-2" /> 
                        </div>
                      </div>      
                    </div> 

            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-light w-40" type="button" id="wd-cancel">
                <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>Cancel</Link>
              </button>
              <button onClick ={saveQuiz} className="btn btn-danger w-40" type="button" id="wd-save">Save</button>
            </div>
            </div>
            </div>
        </div>
        </div>
    </div>
      
  </form>
 
  </div>
 
);}
