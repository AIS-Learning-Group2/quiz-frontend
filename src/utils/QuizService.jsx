// import Axios to allow easy communication  with APIs in the React app
import axios from "axios"

//export the base URL of the localhost
export const api = axios.create({
    baseURL: "/api/Quiz"
})

//To create the questions for the quizzes
export const createQuestion = async(quizQuestion) =>{
    try {
        const response = await api.post("/create-new-question", quizQuestion)
        return response.data
    }catch(error){
        console.error(error)
    }
}


//To retrieve all the questions
export const getAllQuestions = async() => {
    try {
        const response = await api.get("/all-questions")
        return response.data
    } catch (error) {
        console.error(error)
        return []
    }
}

// To fetch the quiz for the students from the given subject with the given number of questions
export const fetchQuiz = async(number, subject) =>{
    try {
        const response = await api.get(
            `/Quiz/fetch-quiz-for-student?numOfQuestions=${number}&subject=${subject}`
        )
        return response.data       
    } catch (error) {
        console.error(error)
        return []
    }
}


//To get all the available subjects for the quizzes
export const getSubjects = async() => {
    try {
        const response = await api.get("/subjects")
        return response.data
    } catch (error) {
        console.error(error)       
    }
}


//To updated questions existing in the database
export const updateQuestions = async(id, question) =>{
    try {
        const response =  await api.put(`/question/${id}/update`, question)
        return response.data
    } catch (error) {
        console.error(error)    
    }
}


//To retrieve the available quetions by their Ids
export  const getQuestionById = async(id) =>{
    try{
        const response = await api.get(`/question/${id}`)
        return response.data
    }catch(error){
        console.error(error)
    }
}

//To delete the existing questions from the database
export const deleteQuestion = async(id) => {
    try {
        const response = await api.delete(`/question/${id}/delete`)
        return response.data
    } catch (error) {
        console.error(error)   
    }
}



export const fetchQuizForUser = async(number, subject) =>{
    try {
      const response = await api.get(
              `/quiz/fetch-questions-for-user?numOfQuestions=${number}&subject=${subject}`
          )
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }