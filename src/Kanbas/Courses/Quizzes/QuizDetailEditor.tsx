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
    _id: "123",
    course: "Course 1",
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

    
  const handleDetailsButton = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuizDetails`);
  };

  const handleQuestionButton = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions`);
  };

 

    return (

      <div id="wd-assignments-editor">
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

    <form>
        <br/>
        <input value={quiz.title} id="wd-title" className="form-control mb-2"
                 onChange={(e) => setQuiz({ ...quiz, title:  e.target.value })}/>
        
        <div className="mb-3">
          <div className="border p-3">
          <label htmlFor="wd-points" className="col-sm-2 col-form-label">
          Quiz Instructions</label>
          <textarea value={quiz.description} className="form-control mb-2" id="wd-description"
             onChange={(e) => setQuiz({ ...quiz, description: e.target.value })} />

            <div className="row mb-3">
              <label htmlFor="wd-points" className="col-sm-2 col-form-label">
              Points</label>
              <div className="col-sm-10">
                <input value={quiz.points} id="wd-points" className="form-control mb-2"
                  onChange={ (e) => setQuiz({ ...quiz, points: parseInt(e.target.value) })}/>
              </div>
            </div>

            
          <div className="row mb-3">
            <label htmlFor="wd-group" className="col-sm-2 col-form-label">Quiz Type</label>
            <div className="col-sm-10">
              <select onChange = {(e) => setQuiz({ ...quiz, quiz_type: e.target.value})}
                className="form-select" id="wd-quiz-type" name="quiz-type">
                <option selected>Graded Quiz</option>
                <option value="1">Practice Quiz</option>
                <option value="2">Graded Survey</option>
                <option value="3">Ungraded Survey</option>
              </select>
            </div>
        </div>
        <div className="row mb-3">
            <label htmlFor="wd-group" className="col-sm-2 col-form-label">Assignment Group</label>
            <div className="col-sm-10">
              <select onChange = {(e) => setQuiz({ ...quiz, group: e.target.value})}
                className="form-select" id="wd-quiz-group" name="assignment-group">
                  <option value="Quizzes">Quizzes</option>
                <option value="Assignments">Assignments</option>
                <option value="Exams">Exams</option>
                <option value="Project">Project</option>
              </select>
            </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="wd-submission-type" className="col-sm-2 col-form-label"></label>
          <div className="col-sm-10">
          
            <label className="col-form-label">Options</label><br/>

            <div className="form-check">
                <input className="form-check-input" type="checkbox" name="check-genre" id="wd-text-entry"/>
                <label className="form-check-label" htmlFor="wd-text-entry">Shuffle Answers</label><br />
            </div>

            <div className="form-check">
                <input className="form-check-input" type="checkbox" name="check-genre" id="wd-website-url"/>
                <label className="form-check-label" htmlFor="wd-website-url">Time Limit</label><br />
              </div>


              <div className="form-check">
              <input value={quiz.time_limit} id="wd-points" className=""
                  onChange={ (e) => setQuiz({ ...quiz, time_limit: (e.target.value) })}/>
                <label className="form-check-label" htmlFor="wd-student-annotation">Minutes</label><br />
                </div>

                <div className="form-check">
                <input className="form-check-input" type="checkbox" name="check-genre" id="wd-media-recordings"/>
                <label className="form-check-label" htmlFor="wd-media-recordings">Allow Multiple Attempts</label><br />
              </div>

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
                    type="date" id="wd-due-date" value={quiz.dueDate} className="form-control"/><br/>
                    </div>

                    
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="wd-available-from" className="col-sm-3 col-form-label">Available from </label>
                        <div className="input-group mb-3">
                        <input onChange = {(e) => setQuiz({ ...quiz, available: e.target.value})}
                          type="date" id="wd-available-from" value={quiz.available}   className="form-control mb-2"/>
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
