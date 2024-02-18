import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSubjects } from '../../utils/QuizService'

const QuizStepper = () =>{

	const[currentStep, setCurrentStep] = useState(1)
	const[selectedSubject, setSelectedSubject] = useState("")
	const[selectedNumOfQuestions, setSelectedNumQuestions] =useState("")
	const[subjects, setSubjects] = useState([])
	const navigate = useNavigate()

	useEffect(()=> {
		fetchSubjects()
	}, [])
	

	const fetchSubjects = async() =>{
		try {
			const allSubjects = await getSubjects()
			setSubjects(allSubjects)
		} catch (error) {
			console.error(error)
		}
	}


	const handleNext = () =>{
		if(currentStep === 3){
			if(selectedSubject && selectedNumOfQuestions){
				navigate("/take-quiz", {state : {selectedNumOfQuestions, selectedSubject}})
			}else{
				alert("Please select a subject and a desired number of questions to be answered in this quiz!!!")
			}
		}else{
			setCurrentStep((prevStep) => prevStep +1)
		}
	}

	const handlePreviosStep = (e) =>{
		setCurrentStep((prevStep => prevStep -1))
	}

	const handleSelectedSubject = (e)=>{
		setSelectedSubject(e.target.value)
	}

	const handleNumQuestionsChange = (e)=>{
		setSelectedNumQuestions(e.target.value)
	}

	const renderStepContent = () =>{
		switch(currentStep){
			case 1:
				return(
					<div>
						<h3 className='text-info mb-2'>Take a Quiz on : </h3>
						<select className="form-select"
						value = {selectedSubject}
						onChange={handleSelectedSubject}
						>
							<option>Select The Subject</option>
							{subjects.map((subject) =>(
								<option key ={subject} value ={subject}>{subject}</option>
							))}
						</select>
					</div>
				)
				case 2:
					return(
						<div>
							<h4 className="text-info mb-2">The desired number of quetions to attempt</h4>
							<input
							type = "number"
							className="form-control"
							value = {selectedNumOfQuestions}
							onChange={handleNumQuestionsChange}
							placeholder="Enter the number of questions"
							/>
						</div>
					)
					case 3:
						return (
							<div>
								<h2>Confirmation</h2>
								<p>Subject : {selectedSubject}</p>
								<p>Selected Number of Questions : {selectedNumOfQuestions}</p>
							</div>
						)
					default: return null
		}
	}

	const renderProgressBar =() =>{
		const progress = currentStep === 3? 100:((currentStep - 1)/2)*100
		return (
			<div className="progress">
				<div className="progress-bar"
				role = "progressbar"
				style ={{width: `${progress}%`}}
				aria-valuenow={progress}
				>
					Step(currentStep)
				</div>
			</div>
		)
	}


	return(
		<section className="mt-5">
			<h3 style ={{color : "GrayText"}}>Welcome to the Quiz - Test Your Knowledge Now!!</h3>
			{renderProgressBar()}
			<div className="card">
				<div className='card-body'>
					{renderStepContent()}
					<div>
						<br/>
						{currentStep > 1 && (
							<button className='btn btn-primary' onClick={handlePreviosStep}>
								Previous
							</button>
						)}

						{currentStep < 3 &&(
							<button
							className="btn btn-primary"
							onClick ={handleNext}
							disabled = {
								(currentStep === 1 &&  !selectedSubject) || 
								(currentStep === 2 && !selectedNumOfQuestions)
							}>
								Next
							</button>
						)}
						{currentStep ===3 &&(
							<button
							className="btn btn-success" onClick = {handleNext}
							>
								Start the Quiz
								</button>
						)}



					</div>

				</div>
			</div>

		</section>
	)

}

export default QuizStepper

























/*
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getSubjects } from "../../utils/QuizService"

 const QuizStepper = () => {
		const [currentStep, setCurrentStep] = useState(1)
		const [selectedSubject, setSelectedSubject] = useState("")
		const [selectedNumQuestions, setSelectedNumQuestions] = useState("")
		const [subjects, setSubjects] = useState([])
		const navigate = useNavigate()

		useEffect(() => {
			fetchSubjectData()
		}, [])

		const fetchSubjectData = async () => {
			try {
				const subjectsData = await getSubjects()
				setSubjects(subjectsData)
			} catch (error) {
				console.error(error)
			}
		}

		const handleNext = () => {
			if (currentStep === 3) {
				if (selectedSubject && selectedNumQuestions) {
					navigate("/take-quiz", { state: { selectedNumQuestions, selectedSubject } })
				} else {
					alert("Please select a subject and number of questions.")
				}
			} else {
				setCurrentStep((prevStep) => prevStep + 1)
			}
		}

		const handlePrevious = () => {
			setCurrentStep((prevStep) => prevStep - 1)
		}

		const handleSubjectChange = (event) => {
			setSelectedSubject(event.target.value)
		}

		const handleNumQuestionsChange = (event) => {
			setSelectedNumQuestions(event.target.value)
		}

		const renderStepContent = () => {
			switch (currentStep) {
				case 1:
					return (
						<div>
							<h3 className="text-info mb-2">I want to take a quiz on :</h3>
							<select
								className="form-select"
								value={selectedSubject}
								onChange={handleSubjectChange}>
								<option value="">Select a subject</option>
								{subjects.map((subject) => (
									<option key={subject} value={subject}>
										{subject}
									</option>
								))}
							</select>
						</div>
					)
				case 2:
					return (
						<div>
							<h4 className="text-info mb-2">How many questions would you like to attempt ?</h4>
							<input
								type="number"
								className="form-control"
								value={selectedNumQuestions}
								onChange={handleNumQuestionsChange}
								placeholder="Enter the number of questions"
							/>
						</div>
					)
				case 3:
					return (
						<div>
							<h2>Confirmation</h2>
							<p>Subject: {selectedSubject}</p>
							<p>Number of Questions: {selectedNumQuestions}</p>
						</div>
					)
				default:
					return null
			}
		}

		const renderProgressBar = () => {
			const progress = currentStep === 3 ? 100 : ((currentStep - 1) / 2) * 100
			return (
				<div className="progress">
					<div
						className="progress-bar"
						role="progressbar"
						style={{ width: `${progress}%` }}
						aria-valuenow={progress}>
						Step {currentStep}
					</div>
				</div>
			)
		}

		return (
			<section className="mt-5">
				<h3 style={{ color: "GrayText" }} className="mb-4">
					Welcome to quiz online
				</h3>
				{renderProgressBar()}
				<div className="card">
					<div className="card-body">
						{renderStepContent()}
						<div className="d-flex justify-content-between mt-4">
							{currentStep > 1 && (
								<button className="btn btn-primary" onClick={handlePrevious}>
									Previous
								</button>
							)}
							{currentStep < 3 && (
								<button
									className="btn btn-primary"
									onClick={handleNext}
									disabled={
										(currentStep === 1 && !selectedSubject) ||
										(currentStep === 2 && !selectedNumQuestions)
									}>
									Next
								</button>
							)}
							{currentStep === 3 && (
								<button className="btn btn-success" onClick={handleNext}>
									Start Quiz
								</button>
							)}
						</div>
					</div>
				</div>
			</section>
		)
 }

 export default QuizStepper
 */