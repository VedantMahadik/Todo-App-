import React from "react";

// the parameters of the  arrow function of Form are the props from parent ie App
const Form = ({ setInputText, setTodos, todos, inputText, setStatus }) => {
	// setInputText is the function of useState, defined in App
	//that sets the value of inputText globally and re - renders  only the part containg inputText
	const inputTextHandler = e => {
		setInputText(e.target.value);
	};
	const submitTodoHandler = e => {
		// the page refreshes every time the form is submitted
		// preventDefault stops the page from refreshing and prevents existing data loss
		e.preventDefault();
		setTodos([
			...todos,
			{ text: inputText, completed: false, id: Math.random() * 1000 },
		]);
		setInputText("");
	};
	const statusHandler = e => {
		// e.target.value gives the actual value that is typed and submitted instead of the object
		setStatus(e.target.value);
	};

	return (
		<form>
			<input
				value={inputText}
				onChange={inputTextHandler}
				type="text"
				className="todo-input"
			/>
			<button onClick={submitTodoHandler} className="todo-button" type="submit">
				<i className="fas fa-plus-square"></i>
			</button>
			<div className="select">
				<select onChange={statusHandler} name="todos" className="filter-todo">
					<option value="all">All</option>
					<option value="completed">Completed</option>
					<option value="uncompleted">Uncompleted</option>
				</select>
			</div>
		</form>
	);
};

export default Form;
