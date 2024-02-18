
import React, { useEffect, useState } from "react"
import { getQuestionById } from "../../utils/QuizService"
import {useParams} from "react-router-dom"



const UpdateQuestion = () => {

    const[question, setQuestion] = useState("")
    const[multiple_options, setMultiple_options] = useState([""])
    const[correct_option, setCorrect_option] = useState([""])
    const[isLoading, setIsLoading] = useState(true)

    const {id} = useParams()
    
    useEffect(()=>{
        fetchQuestion()
    }, [])

    const fetchQuestion = async() => {
        try {
            const questionToUpdate = await getQuestionById(id)
            if (questionToUpdate){
                setQuestion(questionToUpdate.question)
                setMultiple_options(questionToUpdate.multiple_options)
                setCorrect_option(questionToUpdate.correct_option)
            }
            setIsLoading(false)

        } catch (error) {
            console.error(error)
        }
    }

 
    const handleQuestionChange = (e) =>{
        setQuestion(e.target.value)
    }

    const handleOptionChange = (index, e) => {
        const updatedOptions = [...multiple_options]
        updatedOptions[index] = e.target.value
        setMultiple_options(updatedOptions)
    }

    const handleCorrectOptionChange = (e) =>{
        setCorrect_option(e.target.value)
    }

    const handleQuestionUpdate = async(e) =>{
        e.prventDefault()
        
        try {
            const updatedQuestion = {
                question, 
                multiple_options, 
                correct_option: correct_option.toString().split(",").map((option) => option.trim())
            }
            await updateQuestions(id , updatedQuestion)
            //Todo: navigate back to all questions page 
        } catch (error) {
            console.error(error)
        }
    }

    if(isLoading){
        return <p>Please wait...It is Loading...</p>
    }


    return (
        <section className="container">
            <h4 className="mt-5" style={{color : "GrayText"}}>Update the Quiz</h4>

            <div className="col-md-8">
                <form onSubmit={handleQuestionUpdate}>
                    <div className="form-group">
                        <label className="text-info">Question:</label>
                        <textarea 
                        className="form-control"
                        rows ={4}
                        value ={question}
                        onChange={handleQuestionChange}
                        />
                    </div>

                    <div className="form-group">
                    <label className="text-info">Multiple Options:</label>
                    {multiple_options.map((multiple_option, index) =>(
                        <input
                        key = {index}
                        className="form-control mb-4"
                        type ="text"
                        value = {multiple_option}
                        onChange={(e) => handleOptionChange(index, e)}
                        />
                    ))}
                    </div>

                    <div className="form-group">
                    <label className="text-info">Correct Option(s):</label>
                    <input                        
                        className="form-control mb-4"
                        type ="text"
                        value = {correct_option}
                        onChange={handleCorrectOptionChange}
                        />
                    </div>
                    
                    <div className="btn-group">
                    <button type = "submit" className="btn btn-sm btn-outline-warning">
                         Update the Question
                    </button>
                    <Link to = {"/all-quizzes"} className = "btn btn-outline-primary ml-2">
                        Back to All Questions
                    </Link>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default UpdateQuestion
