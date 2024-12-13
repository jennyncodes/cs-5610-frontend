import { Link, useNavigate} from "react-router-dom";
import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import { addQuiz, setQuiz, deleteQuiz, setQuizzes, updateQuiz } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as quizzesClient from "./client";
import * as coursesClient from "../client";
import { addQuestion, updateQuestion, deleteQuestion, setQuestions } from "./questionReducer";
import TrueFalseEditor from "./TrueFalseEditor";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import FillInTheBlank from "./FillInTheBlank";


export default function QuizQuestionsEditor() {
  const {cid, qid, quid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const {quizzes} = useSelector((state: any) => state.quizzesReducer);
  const { questions } = useSelector((state: any) => state.questionReducer)
  const [activeTab, setActiveTab] = useState("details");
  const [selectedOption, setSelectedOption] = useState("");
  const [question, setQuestion] = useState({
    _id: "",
    type:"MC",
    title: "New question", 
    points: 3,
    question_text: "",
    options: "",
    answers:"",
  });

  const handleOptionChange = (event:any) => {
    setSelectedOption(event.target.value);
};

  let componentToDisplay;
  switch (selectedOption) {
      case "MC":
          componentToDisplay = <MultipleChoiceEditor />;
          break;
      case "TF":
          componentToDisplay = <TrueFalseEditor />;
          break;
      case "FB":
          componentToDisplay = <FillInTheBlank />;
          break;
      default:
          componentToDisplay = <MultipleChoiceEditor />;
  }

  useEffect(() => {
    if(quid === "new") {

    } else {
      const q = questions.find((q:any)=> q._id === quid)
      if(q)
        setQuestion(q)
  }
  }, []);


    const saveQuestion = async () => {
      if (!qid) return;
      if(quid === "new") {
        await quizzesClient.createQuestionForQuiz(qid, question).then((question) => {
          dispatch(addQuestion(question));
        })
      } else {
        await quizzesClient.updateQuestion(question)
          dispatch(updateQuestion(question));
      }
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions`);
    };

 

    return (

      <div id="wd-questions-editor">

    <form>
        <br/>
        <input value={question.title} id="wd-title" className="form-control mb-2"
                 onChange={(e) => setQuestion({ ...question, title:  e.target.value })}/>
        
        <div className="mb-3">
          <div className="border p-3">
          <label htmlFor="wd-points" className="col-sm-2 col-form-label">
          Quiz Instructions</label>
          <textarea value={question.question_text} className="form-control mb-2" id="wd-description"
             onChange={(e) => setQuestion({ ...question, question_text: e.target.value })} />

            <div className="row mb-3">
              <label htmlFor="wd-points" className="col-sm-2 col-form-label">
              Points</label>
              <div className="col-sm-10">
                <input value={question.points} id="wd-points" className="form-control mb-2"
                  onChange={ (e) => setQuestion({ ...question, points: parseInt(e.target.value) })}/>
              </div>
            </div>

            
          <div className="row mb-3">
            <label htmlFor="wd-group" className="col-sm-2 col-form-label">Question Type</label>
            <div className="col-sm-10">
              <select value={selectedOption} onChange = {(e) => setQuestion({ ...question, type: e.target.value})}
                className="form-select" name="question-type">
                <option defaultChecked value="MC">Multiple Choice </option>
                <option value="TF">True or False</option>
                <option value="FB">Fill in the Blank</option>
              </select>
            
            </div>
        </div>
        
            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-light w-40" type="button" id="wd-cancel">
                  <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions`}>Cancel</Link>
                            </button>
              <button onClick ={saveQuestion} className="btn btn-danger w-40" type="button" id="wd-save">Save</button>
            </div>
            </div>

   
  
    </div>
      
  </form>
 
  </div>
 
);}
