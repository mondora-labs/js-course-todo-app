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

	var addTodoToServerList = function (todo) {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "add-todo", true);
		xhr.send(todo);
	};

	var getListFromSever = function () {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "list.json", true);
		// Register handler for the onload event
		xhr.onload = function () {
			var list;
			try {
				list = JSON.parse(this.response);
			} catch (e) {
				list = [];
			}
			list.forEach(function (todo) {
				addTodoToList(todo);
			});
		};
		xhr.send();
	};

	// Register listeners for the click event
	addTodoButton.addEventListener("click", function () {
		// Get the text in the input
		var text = todoTextInput.value;
		// Clear the input
		todoTextInput.value = "";
		// Add the todo to the list
		addTodoToList(text);
		// Add the todo to the list on the server
		addTodoToServerList(text);
	});

	getListFromSever();

});
