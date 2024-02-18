import React from 'react'

const AnswerOptions = ({question, isChecked, handleOptionChange, handleCheckboxChange}) =>{

	if(!question){
		return <div>No Question is available here!!!</div>
	}

	const {id,question_category,multiple_options} =  question

	if(question_category ==="single"){
		return(
			<div>
					{multiple_options.sort().map((option, index) =>(
						<div key ={option} className='form-check mb-3'>
								<input
								type = 'radio'
								className='form-check-input'
								id = {option}
								value = {option}
								checked = {isChecked(question.id,  option)}
								onChange={() => handleOptionChange(id, option)}/>
								<label className='form-check-label ms-2'>{option}</label>
						</div>
					))}
			</div>
		)
		}else if(question_category === "multiple"){
			return(
				<div>
					<p>Select All that apply: </p>
					{multiple_options.sort().map((option, index) =>(
						<div key ={option} className='form-check mb-3'>
								<input
								type = 'checkbox'
								className='form-check-input'
								id = {option}
								value = {option}
								name = {question.id}
								checked = {isChecked(question.id,  option)}
								onChange={() => handleCheckboxChange(id, option)}
								/>
								<label className='form-check-label ms-2'>{option}</label>
						</div>
					))}
				</div>
			)
		}else{
			return null
		}	
	}

export default AnswerOptions






















/*
import React from "react"

const AnswerOptions = ({ question, isChecked, handleAnswerChange, handleCheckboxChange }) => {
	if (!question) {
		return (
			<div>
				No questions available, <br /> you may try agian by reducing your requested number of
				questions on this topic
			</div>
		)
	}

	const { id, questionType, choices } = question

	if (questionType === "single") {
		return (
			<div>
				{choices.sort().map((choice, index) => (
					<div key={choice} className="form-check mb-3">
						<input
							className="form-check-input"
							type="radio"
							id={choice}
							name={question.id}
							value={choice}
							checked={isChecked(question.id, choice)}
							onChange={() => handleAnswerChange(id, choice)}
						/>
						<label htmlFor={choice} className="form-check-label ms-2">
							{choice}
						</label>
					</div>
				))}
			</div>
		)
	} else if (questionType === "multiple") {
		return (
			<div>
				{choices.sort().map((choice, index) => (
					<div key={choice} className="form-check mb-3">
						<input
							className="form-check-input"
							type="checkbox"
							id={choice}
							name={question.id}
							value={choice}
							checked={isChecked(question.id, choice)}
							onChange={() => handleCheckboxChange(id, choice)}
						/>
						<label htmlFor={choice} className="form-check-label ms-2">
							{choice}
						</label>
					</div>
				))}
			</div>
		)
	} else {
		return null
	}
}

export default AnswerOptions

*/