export default function QuizDetails() {
    const quizDetails = {
        title: 'Q1 - HTML',
        quizType: 'Graded Quiz',
        points: 29,
        assignmentGroup: 'QUIZZES',
        shuffleAnswers: false,
        timeLimit: '30 Minutes',
        multipleAttempts: false,
        howManyAttempts: 1,
        showCorrectAnswers: 'Immediately',
        accessCode: '',
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: 'Sep 21 at 1pm',
        availableDate: 'Sep 21 at 11:40am',
        untilDate: 'Sep 21 at 1pm',
      };
    
  return (
    <div className="container my-4">
      <h2>{quizDetails.title}</h2>
      <div className="quiz-details">
        <div className="row mb-2">
          <div className="col-sm-4 font-weight-bold">Quiz Type</div>
          <div className="col-sm-8">{quizDetails.quizType}</div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-4 font-weight-bold">Points</div>
          <div className="col-sm-8">{quizDetails.points}</div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-4 font-weight-bold">Assignment Group</div>
          <div className="col-sm-8">{quizDetails.assignmentGroup}</div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-4 font-weight-bold">Shuffle Answers</div>
          <div className="col-sm-8">{quizDetails.shuffleAnswers ? 'Yes' : 'No'}</div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-4 font-weight-bold">Time Limit</div>
          <div className="col-sm-8">{quizDetails.timeLimit}</div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-4 font-weight-bold">Multiple Attempts</div>
          <div className="col-sm-8">{quizDetails.multipleAttempts ? 'Yes' : 'No'}</div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-4 font-weight-bold">How Many Attempts</div>
          <div className="col-sm-8">{quizDetails.howManyAttempts}</div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-4 font-weight-bold">Show Correct Answers</div>
          <div className="col-sm-8">{quizDetails.showCorrectAnswers}</div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-4 font-weight-bold">Access Code</div>
          <div className="col-sm-8">{quizDetails.accessCode || 'None'}</div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-4 font-weight-bold">One Question at a Time</div>
          <div className="col-sm-8">{quizDetails.oneQuestionAtATime ? 'Yes' : 'No'}</div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-4 font-weight-bold">Webcam Required</div>
          <div className="col-sm-8">{quizDetails.webcamRequired ? 'Yes' : 'No'}</div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-4 font-weight-bold">Lock Questions After Answering</div>
          <div className="col-sm-8">{quizDetails.lockQuestionsAfterAnswering ? 'Yes' : 'No'}</div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-4 font-weight-bold">Due Date</div>
          <div className="col-sm-8">{quizDetails.dueDate}</div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-4 font-weight-bold">Available Date</div>
          <div className="col-sm-8">{quizDetails.availableDate}</div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-4 font-weight-bold">Until Date</div>
          <div className="col-sm-8">{quizDetails.untilDate}</div>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary mx-2">Preview</button>
        <button className="btn btn-primary">Edit</button>
      </div>
    </div>
  );
}