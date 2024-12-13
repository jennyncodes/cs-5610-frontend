import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes:<any>[],
    quiz: {
      _id:"1",
      course:"",
      title: "",
      description: "",
      assignedTo: "",
      quiz_type: "",
      points: 0,
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
      availability: "",
      available: new Date().toISOString().slice(0, 16),
      availableUntil: new Date().toISOString().slice(0, 16),
  }
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
			state.quizzes = action.payload;
		},
    addQuiz: (state, {payload: quiz}) => {
      const newQuiz: any = {
        _id: new Date().getTime().toString(),
        ...quiz,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
		},
    deleteQuiz: (state, {payload: quizId}) => {
      state.quizzes = state.quizzes.filter(
        (quiz: any) => quiz._id !== quizId
      );
    },
    updateQuiz: (state, {payload: newQuiz}) => {
      state.quizzes = state.quizzes.map((quiz:any) => 
        newQuiz._id === quiz._id ? newQuiz : quiz
      ) as any;
  },
    setQuiz: (state, { payload: quizId}) => {
      state.quiz = state.quizzes.map((q: any) =>
        q._id === quizId ? { ...q, editing: true } : q
      ) as any;
  },
    
  },
});
export const { addQuiz, deleteQuiz, 
  updateQuiz, setQuiz, setQuizzes} =
  quizzesSlice.actions;
export default quizzesSlice.reducer;