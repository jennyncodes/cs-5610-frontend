import React, { useState } from "react";

export default function FillInTheBlankEditor() {
  const [questionDetails, setQuestionDetails] = useState({
    title: "",
    points: 0,
    question: "",
    answers: [{ id: 1, text: "" }],
  });

  const addAnswer = () => {
    setQuestionDetails((prevDetails) => ({
      ...prevDetails,
      answers: [...prevDetails.answers, { id: prevDetails.answers.length + 1, text: "" }],
    }));
  };

  const updateAnswer = (id: number, text: string) => {
    setQuestionDetails((prevDetails) => ({
      ...prevDetails,
      answers: prevDetails.answers.map((answer) =>
        answer.id === id ? { ...answer, text } : answer
      ),
    }));
  };

  const removeAnswer = (id: number) => {
    setQuestionDetails((prevDetails) => ({
      ...prevDetails,
      answers: prevDetails.answers.filter((answer) => answer.id !== id),
    }));
  };

  const handleCancel = () => {
    setQuestionDetails({
      title: "",
      points: 0,
      question: "",
      answers: [{ id: 1, text: "" }],
    });
  };

  const handleSave = () => {
    const sanitizedAnswers = questionDetails.answers
      .map((answer) => answer.text.trim())
      .filter((text) => text !== "");
    const questionData = {
      ...questionDetails,
      answers: sanitizedAnswers,
    };
    console.log("Saving question:", questionData);
    alert("Question saved successfully!");
  };

  return (
    <div className="container my-4">
      <h2>Fill in the Blank Question Editor</h2>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Title</th>
            <td>
              <input
                type="text"
                className="form-control"
                value={questionDetails.title}
                onChange={(e) =>
                  setQuestionDetails({ ...questionDetails, title: e.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Points</th>
            <td>
              <input
                type="number"
                className="form-control"
                value={questionDetails.points}
                onChange={(e) =>
                  setQuestionDetails({ ...questionDetails, points: parseInt(e.target.value, 10) })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Question</th>
            <td>
              <textarea
                className="form-control"
                rows={4}
                value={questionDetails.question}
                onChange={(e) =>
                  setQuestionDetails({ ...questionDetails, question: e.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Answers</th>
            <td>
              {questionDetails.answers.map((answer) => (
                <div key={answer.id} className="d-flex align-items-center mb-2">
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder={`Possible Answer ${answer.id}`}
                    value={answer.text}
                    onChange={(e) => updateAnswer(answer.id, e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeAnswer(answer.id)}
                    disabled={questionDetails.answers.length === 1}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button type="button" className="btn btn-link p-0" onClick={addAnswer}>
                + Add Another Answer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary mx-2" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          Save Question
        </button>
      </div>
    </div>
  );
}
