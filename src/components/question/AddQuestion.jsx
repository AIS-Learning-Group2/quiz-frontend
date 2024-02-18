
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { createQuestion, getSubjects } from "../../utils/QuizService"


const AddQuestion = () => {
	const [question, setQuestion] = useState("")
	const [question_category, setQuestion_category] = useState("single")
	const [multiple_options, setMultiple_option] = useState([""])
	const [correct_option, setCorrect_option] = useState([""])
	const [subject_category, setSubject] = useState("")
	const [newSubject, setNewSubject] = useState("")
	const [subjectOptions, setSubjectOptions] = useState([""])
   

	useEffect(() => {
		fetchSubjects()
	}, [])

   
	const fetchSubjects = async () => {
		try {
			const subjectsData = await getSubjects()
			setSubjectOptions(subjectsData)
		} catch (error) {
			console.error(error)
		}
	}

	
  
	const handleAddOption = () => {
		const lastOption = multiple_options[multiple_options.length - 1]
		const lastOptionLetter = lastOption ? lastOption.charAt(0) : "A"
		const newOptionLetter = String.fromCharCode(lastOptionLetter.charCodeAt(0) + 1)
		const newOption = `${newOptionLetter}.`
		setMultiple_option([...multiple_options, newOption])
	}

	const handleRemoveOption = (index) => {
		setMultiple_option(multiple_options.filter((selection, i) => i !== index))
	}

	const handleOptionChange = (index, value) => {
		setMultiple_option(multiple_options.map((selection, i) => (i === index ? value : selection)))
	}

	const handleCorrectOptionChange = (index, value) => {
		setCorrect_option(correct_option.map((selection, i) => (i === index ? value : selection)))
	}

	const handleAddCorrectOption = () => {
		setCorrect_option([...correct_option, ""])
	}

	const handleRemoveCorrectOption  = (index) => {
		setCorrect_option(correct_option.filter((selection, i) => i !== index))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const result = {
				question,
				questionCategory:question_category,
				multiple_options,
				correct_option: correct_option.map((selection) => {
					const selectionLetter = selection .charAt(0).toUpperCase()
                    
                    // Calculate the index of the uppercase letter in the alphabet (0-based), where 'A' has an index of 0.
                    
					const selectionIndex = selectionLetter.charCodeAt(0) - 65
					return selectionIndex >= 0 && selectionIndex < multiple_options.length ? selectionLetter : null
				}),

				subject:subject_category
			}

			await createQuestion(result)

			setQuestion("")
			setQuestion_category("single")
			setMultiple_option([""])
			setCorrect_option([""])
			setSubject("")
		} catch (error) {
			console.error(error)
		}
	}

	const handleAddSubject = () => {
		if (newSubject.trim() !== "") {
			setSubject(newSubject.trim())
			setSubjectOptions([...subjectOptions, newSubject.trim()])
			setNewSubject("")
		}
	}

	return (
		
		<div className="container-fluid text-center mt-5">
			<div className="row justify-content-center">
				<div className="col-md-100 mx-auto">
					<div className="card">
						<div className="card-header">
							<h5 className="card-title text-center">Insert New Questions to the Quiz</h5>
						</div>
						<div className="card-body">
							<form onSubmit={handleSubmit} className="p-2">
								<div className="mb-3">
									<label htmlFor="subject_category" className="form-label text-info">
										Select the  Subject
									</label>
									<select
										id="subject_category"
										value={subject_category}
										onChange={(e) => setSubject(e.target.value)}
										className="form-control">
										<option value="">Select subject_category</option>
										<option value={"New"}>Add New</option>
										{subjectOptions.map((option) => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</select>
								</div>

								{subject_category === "New" && (
									<div className="mb-3">
										<label htmlFor="new-subject_category" className="form-label text-info">
											Create New Subject
										</label>
										<input
											type="text"
											id="new-subject_category"
											value={newSubject}
											onChange={(event) => setNewSubject(event.target.value)}
											className="form-control"
										/>
										<button
											type="button"
											onClick={handleAddSubject}
											className="btn btn-outline-primary mt-2">
											Add subject
										</button>
									</div>
								)}
								<div className="mb-3">
									<label htmlFor="question-text" className="form-label text-info">
										Type the Question
									</label>
									<textarea
										className="form-control"
										rows={4}
										value={question}
										onChange={(e) => setQuestion(e.target.value)}></textarea>
								</div>
								<div className="mb-3">
									<label htmlFor="question-type" className="form-label text-info">
										Question type
									</label>
									<select
										id="question-type"
										value={question_category}
										onChange={(event) => setQuestion_category(event.target.value)}
										className="form-control">
										<option value="single">Single Choice</option>
										<option value="multiple">Multiple Choices</option>
									</select>
								</div>
								<div className="mb-3">
									<label htmlFor="multiple_options" className="form-label text-primary">
                                    multiple_options
									</label>
									{multiple_options.map((selection, index) => (
										<div key={index} className="input-group mb-3">
											<input
												type="text"
												value={selection}
												onChange={(e) => handleOptionChange(index, e.target.value)}
												className="form-control"
											/>
											<button
												type="button"
												onClick={() => handleRemoveOption(index)}
												className="btn btn-outline-danger">
												Remove
											</button>
										</div>
									))}
									<button
										type="button"
										onClick={handleAddOption}
										className="btn btn-outline-primary">
										Add Choices
									</button>
								</div>
								{question_category === "single" && (
									<div className="mb-3">
										<label htmlFor="answer" className="form-label text-success">
											The Correct Answer
										</label>
										<input
											type="text"
											className="form-control"
											id="answer"
											value={correct_option[0]}
											onChange={(e) => handleCorrectOptionChange(0, e.target.value)}
										/>
									</div>
								)}
								{question_category === "multiple" && (
									<div className="mb-3">
										<label htmlFor="answer" className="form-label text-success">
											Correct Answer(s)
										</label>
										{correct_option.map((answer, index) => (
											<div key={index} className="d-flex mb-2">
												<input
													type="text"
													className="form-control me-2"
													value={answer}
													onChange={(e) => handleCorrectOptionChange(index, e.target.value)}
												/>
												{index > 0 && (
													<button
														type="button"
														className="btn btn-danger"
														onClick={() => handleRemoveCorrectOption(index)}>
														Delete
													</button>
												)}
											</div>
										))}
										<button
											type="button"
											className="btn btn-outline-info"
											onClick={handleAddCorrectOption}>
											Insert Correct Answer
										</button>
									</div>
								)}

								{!correct_option.length && <p>Please select at least one correct answer.</p>}

								<div className="btn-group">
									<button type="submit" className="btn btn-outline-success mr-2">
										Save the Question
									</button>
									<Link to={"/all-quizzes"} className="btn btn-outline-primary ml-2">
										Back To Existing Questions
												</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	)
}


export default AddQuestion

