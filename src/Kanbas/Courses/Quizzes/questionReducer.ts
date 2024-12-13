import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions:<any>[],
    question: {
      _id: "1",
      type: "",
      title: "New question", 
      points: "",
      question_text: "",
      choices: "",
      answers:"",
  }
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
			state.questions = action.payload;
		},
    addQuestion: (state, {payload: question}) => {
      const newQuestion: any = {
        _id: new Date().getTime().toString(),
        ...question,
      };
      state.questions = [...state.questions, newQuestion] as any;
		},
    deleteQuestion: (state, {payload: questionId}) => {
      state.questions = state.questions.filter(
        (question: any) => question._id !== questionId
      );
    },
    updateQuestion: (state, {payload: newQuestion}) => {
      state.questions = state.questions.map((question:any) => 
        newQuestion._id === question._id ? newQuestion : question
      ) as any;
  },
    setQuestion: (state, { payload: questionId}) => {
      state.question = state.questions.map((a: any) =>
        a._id === questionId ? { ...a, editing: true } : a
      ) as any;
  },
    
  },
});
export const { addQuestion, deleteQuestion, 
  updateQuestion, setQuestion, setQuestions} =
  questionsSlice.actions;
export default questionsSlice.reducer;