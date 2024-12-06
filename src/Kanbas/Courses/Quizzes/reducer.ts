import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes:<any>[],
    quiz: {
      _id: "1",
      title: "New Assignment", 
      description: "",
      points: "100",
      course: "RS101",
      dueDate: new Date().toISOString().slice(0, 16),
      availableFrom: new Date().toISOString().slice(0, 16),
      availableUntil: new Date().toISOString().slice(0, 16)
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