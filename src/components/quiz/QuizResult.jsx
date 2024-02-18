import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

const QuizResult = () => {
	const location = useLocation
	const {quizQuestions, totalScore} = location.state
	const numOfQuestions = quizQuestions.length
	const percentage = Math.round((totalScore/numOfQuestions)*100)
	
	
	const handleRetakeQuiz =() =>{
		alert("This Functionality is not implemented!!!")
	}

	return(

		<section classNmae = 'container mt-5'>
			<h3>The Summary of the Quiz Result </h3>
			<hr/>

			<h5> The Number of answered Questions : {numOfQuestions}</h5>
			<h5>The Number of Correct Answers : {totalScore}</h5>

			<p> The Total Score : {percentage}% </p>

			<button class = 'btn btn-primary btn-sm' onClick ={handleRetakeQuiz}>
				Retake this quiz
			</button>


		</section>
	)
}

export default QuizResult
































/*
import React from "react"
import { useLocation} from "react-router-dom"

 const QuizResult = () => {
		const location = useLocation()
		const { quizQuestions, totalScores } = location.state
		const numQuestions = quizQuestions.length
		const percentage = Math.round((totalScores / numQuestions) * 100)

		const handleRetakeQuiz = () => {
			alert("Oops! this functionality was not implemented!!!")
		}

		return (
			<section className="container mt-5">
				<h3>Your Quiz Result Summary</h3>
				<hr />
				<h5 className="text-info">
					You answered {totalScores} out of {numQuestions} questions correctly.
				</h5>
				<p>Your total score is {percentage}%.</p>

				<button className="btn btn-primary btn-sm" onClick={handleRetakeQuiz}>
					Retake this quiz
				</button>
			</section>
		)
 }

 export default QuizResult

 */