import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import coursesReducer from "./Courses/reducer";
import enrollmentsReducer from "./Courses/Enrollments/reducers";
import quizzesReducer from "./Courses/Quizzes/reducer";
import questionReducer from "./Courses/Quizzes/questionReducer";


const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    coursesReducer,
    enrollmentsReducer,
    quizzesReducer,
    questionReducer,
    
  },
});
export default store;