// Select HTML elements
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

// Get saved todos from localStorage
const saved = localStorage.getItem("todos");

const todos = saved ? JSON.parse(saved) : [];


// Save todos
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}


// Create Todo item
function createTodoNode(todo, index) {

    const li = document.createElement("li");

    // Checkbox
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;


    // Todo text
    const span = document.createElement("span");

    span.textContent = todo.text;


    // Delete button
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";


    // Checkbox event
    checkbox.addEventListener("change", function () {

        todo.completed = checkbox.checked;

        saveTodos();

        render();
    });


    // Delete event
    deleteBtn.addEventListener("click", function () {

        todos.splice(index, 1);

        saveTodos();

        render();
    });


    // Add elements to li
    li.appendChild(checkbox);

    li.appendChild(span);

    li.appendChild(deleteBtn);


    return li;
}


// Display all todos
function render() {

    list.innerHTML = "";

    todos.forEach(function(todo, index) {

        const node = createTodoNode(todo, index);

        list.appendChild(node);

    });
}


// Add Todo
function addTodo() {

    const text = input.value.trim();


    // Don't add empty todo
    if (text === "") {

        return;
    }


    // Add todo to array
    todos.push({

        text: text,

        completed: false

    });


    // Clear input
    input.value = "";


    // Save and display
    saveTodos();

    render();
}


// Add button click
addBtn.addEventListener("click", addTodo);


// Press Enter to add
input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTodo();

    }

});


// Display saved todos
render();