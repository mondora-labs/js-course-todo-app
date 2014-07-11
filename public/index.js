document.addEventListener("DOMContentLoaded", function () {

	// Get a reference of needed elements on the page
	var listContainerUl = document.getElementById("listContainer");
	var addTodoButton = document.getElementById("addTodo");
	var todoTextInput = document.getElementById("todoText");

	var addTodoToList = function (todo) {
		// Create a new li element
		var newTodoLi = document.createElement("li");
		// Set the text of the li element
		newTodoLi.textContent = todo;
		// Append the element to the list
		listContainerUl.appendChild(newTodoLi);
	};

	var addTodoToLocasStorage = function (todo) {
		// Get the current array from localStorage
		var list = getListFromLocalStorage();
		list.push(todo);
		localStorage.list = JSON.stringify(list);
	};

	var getListFromLocalStorage = function () {
		var list;
		try {
			list = JSON.parse(localStorage.list);
		} catch (e) {
			list = [];
		}
		return list;
	};

	// Register listeners for the click event
	addTodoButton.addEventListener("click", function () {
		// Get the text in the input
		var text = todoTextInput.value;
		// Clear the input
		todoTextInput.value = "";
		// Add the todo to the list
		addTodoToList(text);
		// Add the todo to localStorage
		addTodoToLocasStorage(text);
	});

	// Load todo-s from localStorage
	var list = getListFromLocalStorage();
	list.forEach(function (todo) {
		addTodoToList(todo);
	});

});
