//!form=>submit=>create todo {id,title,createdAt}

// let todos = [];
let filterValue = "all";
//selecting:
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todolist");
const filteredTodos = document.querySelector(".filter-todos");

//event:

document.addEventListener("DOMContentLoaded", (e) => {
  const todos = getAllTodos();
  createTodo(todos);
});

todoForm.addEventListener("submit", addNewTodo);

filteredTodos.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});

//functions:

function filterTodos() {
  //const filter = e.target.value;
  const todos = getAllTodos();
  switch (filterValue) {
    case "all": {
      createTodo(todos);
      break;
    }
    case "completed": {
      createTodo(todos.filter((t) => t.isCompleted));
      break;
    }
    case "uncompleted": {
      createTodo(todos.filter((t) => !t.isCompleted));
      break;
    }
    default: {
      createTodo(todos);
      break;
    }
  }
}

function addNewTodo(e) {
  e.preventDefault();

  if (!todoInput.value) return null;

  const newTodo = {
    id: Date.now(),
    title: todoInput.value,
    createdAt: new Date().toISOString(),
    isCompleted: false,
  };
  //todos.push(newTodo);
  saveTodo(newTodo);
  filterTodos();
  // createTodo(todos);
}

function createTodo(todos) {
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo"><p class="todo__title ${
      todo.isCompleted && "completed"
    }">${todo.title}</p>
      <span class="todo__createdAt">${new Date(
        todo.createdAt
      ).toLocaleDateString("fa-IR")}</span>
      <button class="todo__check" data-todo-id=${todo.id}><i class="far ${
      todo.isCompleted ? "fa-regular fa-square" : "fa-check-square"
    }"></i></button>
      <span><i class="far fa-edit"></i></span>
      <button class="todo__remove" data-todo-id=${
        todo.id
      }><i class="far fa-trash-alt"></i></button>
    </li>`;
  });
  todoList.innerHTML = result;
  todoInput.value = "";
  const removeBtns = [...document.querySelectorAll(".todo__remove")];
  removeBtns.forEach((btn) => btn.addEventListener("click", removeTodo));

  const checkBtns = [...document.querySelectorAll(".todo__check")];
  checkBtns.forEach((btn) => btn.addEventListener("click", checkTodo));
}

function removeTodo(e) {
  // console.log(e.target.value);
  //! dasteresi be data attribute ha:  console.log(e.target.dataset);
  //agar begim data-todo-id :e.target.dataset.todoId
  let todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((todo) => todo.id !== todoId);
  // createTodo(todos);
  saveAllTodos(todos);
  filterTodos();
}

function checkTodo(e) {
  const todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((todo) => todo.id == todoId);
  todo.isCompleted = !todo.isCompleted;
  // createTodo(todos);
  saveAllTodos(todos);
  filterTodos();
}

function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  //console.log(savedTodos);
  return savedTodos;
}

function saveTodo(todo) {
  const savedTodos = getAllTodos();
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos;
}

function saveAllTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
