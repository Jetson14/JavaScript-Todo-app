const taskInput = document.querySelector(".task-input input"),
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear-btn"),
taskBox = document.querySelector(".task-box");


let editId;
let isEditedTask = false;
// getting localstorage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn=>{
    btn.addEventListener("click",()=>{
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
})

function showTodo(filter){
    let li = "";
    
    todos?.forEach((todo, id) => {
        //if todo status is completed, set the isCompleted
        let isCompleted = todo.status == "completed" ? "checked" :"";
        if(filter == todo.status || filter == "all"){
            li += `<li class="task">
                        <label for="${id}">
                            <input onclick='updateStatus(this)' type="checkbox" id="${id}">
                            <p class="${isCompleted}">${todo.name}</p>
                        </label>
                        <div class="settings">
                            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                            <ul class="task-menu">
                                <li onclick="editTask(${id},'${todo.name}')"><i class="uil uil-pen"></i>Edit</li>
                                <li onclick='deleteTask(${id})'><i class="uil uil-trash"></i>Delete</li>
                            </ul>
                        </div>
                    </li>`;
        }
        
    });
    taskBox.innerHTML = li || `<span>You don't have any task here<span>`;
}

showTodo("all");

function showMenu(selectedTask){
    // getting task menu div
   let taskMenu = selectedTask.parentElement.lastElementChild;
   taskMenu.classList.add("show");
   document.addEventListener("click", e=>{
    //removing show class from the task menu on the documnet click
    if(e.target.tagName != "I" || e.target !=selectedTask){
        taskMenu.classList.remove("show");
    }
   })
}

function updateStatus(selectedTask){
    // getting paragraph that contains task name
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskName.classList.add("checked");
        //updating the status of selected task to complete
        todos[selectedTask.id].status = "completed";
    }
    else{
        taskName.classList.remove("checked");
        //updating the status of selected task to pending
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

function deleteTask(deleteId){
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
}

clearAll.addEventListener("click", ()=>{
    //removing all items from todos
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
})

function editTask(taskId, taskName){
    editId = taskId;
    isEditedTask = true;
    taskInput.value = taskName;
}

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask){
        if(!isEditedTask){
            if(!todos){ // if todos doesn't exist, pass an empty aray.
                todos = [];
            }
            let taskInfo = {name: userTask, status:"pending"};
            todos.push(taskInfo); // adding new task to todos.
        }
        else{
            isEditedTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos)); 
        showTodo();
    }
})