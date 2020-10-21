import React, { useState, useEffect } from "react";
import "./App.css";

// importing components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
	// js part here

	// useState() =>  when depending on changes in web app (ie change in state) we want to make changes.
	// useState returns an array with one value and one function

	// this means inputText will be assigned empty string at start as arg of useState is ""
	const [inputText, setInputText] = useState("");
	// this means todos will be assigned an empty array
	const [todos, setTodos] = useState([]);
	const [status, setStatus] = useState("all");
	const [filteredTodos, setFilteredTodos] = useState([]);

	const filterHandler = () => {
		switch (status) {
			case "completed":
				// setFilteredTodos is a function that changed the value of filteredTodos to whatever is the argument of it
				setFilteredTodos(todos.filter(todo => todo.completed === true));
				break;
			case "uncompleted":
				setFilteredTodos(todos.filter(todo => todo.completed === false));
				break;
			default:
				setFilteredTodos(todos);
		}
	};
	const saveLocalTodos = () => {
		localStorage.setItem("todos", JSON.stringify(todos));
	};
	const getLocalTodos = () => {
		if (localStorage.getItem("todos") === null) {
			localStorage.setItem("todos", JSON.stringify([]));
		} else {
			let todoLocal = JSON.parse(localStorage.getItem("todos"));
			setTodos(todoLocal);
		}
	};

	// this is function that has two parameters
	// first is an arrow function!! not the function defined in the js part
	// second is the condtion ie when ever changes the function is called
	// [] means call at the start of the app
	useEffect(() => {
		getLocalTodos();
	}, []);
	// this means call filterHandler() & saveLocalTodos() whenever there is change in todos or state
	useEffect(() => {
		filterHandler();
		saveLocalTodos();
	}, [todos, status]);
	// this returns in jsx that is injected in html div having id = root
	return (
		// NOTE: in jsx, the class of a div is replaced by className as class is a reserved word in js
		<div className="App">
			<header>
				<h1>To do list</h1>
			</header>
			<Form
				todos={todos}
				setTodos={setTodos}
				inputText={inputText}
				setInputText={setInputText}
				setStatus={setStatus}
			/>
			<TodoList filteredTodos={filteredTodos} todos={todos} setTodos={setTodos} />
		</div>
		// here Form and TodoList are two components defined in the component dir
		// the arg passed in field (<Form *field*/>) are called as props and can be accessed in Form using props.propName (eg: props.todos )
	);
}

export default App;
