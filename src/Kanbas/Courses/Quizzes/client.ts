import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;


export const updateQuiz = async (quiz: any) => {
    const { data } = await axiosWithCredentials.put(`${COURSES_API}/${quiz._id}`, quiz);
    return data;
};
  
export const deleteQuiz = async (quizId: any) => {
 const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
 return response.data;
};

// export const findQuizzesForCourse = async (courseId:any) => {
//     const response = await axiosWithCredentials
//       .get(`${COURSES_API}/${courseId}/quizzes`);
//     return response.data;
//   };
