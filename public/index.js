document.addEventListener("DOMContentLoaded", function () {

	// Get a reference of needed elements on the page
	var listContainerUl = document.getElementById("listContainer");
	var addTodoButton = document.getElementById("addTodo");
	var todoTextInput = document.getElementById("todoText");

	// Register listeners for the click event
	addTodoButton.addEventListener("click", function () {
		// Get the text in the input
		var text = todoTextInput.value;
		// Clear the input
		todoTextInput.value = "";
		// Create a new li element
		var newTodoLi = document.createElement("li");
		// Set the text of the li element
		newTodoLi.textContent = text;
		// Append the element to the list
		listContainerUl.appendChild(newTodoLi);
	});

});
