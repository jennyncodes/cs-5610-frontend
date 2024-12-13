import { useSelector, useDispatch } from "react-redux";
import { setQuestion } from "./questionReducer";
import React, { useEffect, useState } from "react";


export default function MultipleChoiceEditor() {
  const dispatch = useDispatch();
  const { question } = useSelector((state: any) => state.questionReducer);
  const [selectedAnswer, setSelectedAnswer] = useState<string>(
    question.answer[0] || ""
  );

  const handleAddOption = () => {
    dispatch(setQuestion({ ...question, options: [...question.options, ""] }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...question.options];
    updatedOptions[index] = value;
    dispatch(setQuestion({ ...question, options: updatedOptions }));
  };

  const handleOptionDelete = (index: number) => {
    const updatedOptions = question.options.filter(
      (_option: any, i: number) => i !== index
    );
    dispatch(setQuestion({ ...question, options: updatedOptions }));
  };

  const handleRadioButtonChange = (value: string) => {
    setSelectedAnswer(value);
    dispatch(setQuestion({ ...question, answer: [value] }));
  };

  useEffect(() => {
    setSelectedAnswer(question.answer[0] || "");
  }, [question.answer]);

  return (
    <div className="wd-asmt-edit-home flex-fill">
    
  
      <input 
            type="text"
            className="form-control"
            placeholder=""
            value={question.type}
            />
      
      <input
                type="number"
                className="form-control"
                value={question.points}
                onChange={(e) =>
                  setQuestion({ ...question, points: parseInt(e.target.value, 3)})
                }
              />
                <p>Enter your questions and multiple answers, then select the one correct
                answer.</p>
                <br/>
      
      <h3>Answers:</h3>
      <div id="answers">
        {question.options.map((option: any, index: any) => (
          <div key={index} className="option-container">
            <input
              type="radio"
              name="correct-answer"
              checked={question.answer === option}
              onChange={() => handleRadioButtonChange(option)}
            />
            <input
              type="text"
              className="form-control w-25 option-text"
              value={question.options}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
            <button
              className="btn btn-primary edit-button"
              onClick={() => console.log("Edit button clicked")}
            >
              Edit
            </button>
            <button
              className="btn btn-danger delete-button"
              onClick={() => handleOptionDelete(index)}
            >
              Delete
            </button>
          </div>
        ))}
        <br />
        <button
            className={`btn me-2 ${question.options ? "btn-success" : "btn-outline-secondary"}`}
            onClick={handleAddOption}>+ Add Another Answer</button>
        <br />
      </div>
    </div>
  );
}
