const taskInput = document.querySelector(".task-input input");

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask){
        // getting localstorage todo-list
        let todos = JSON.parse(localStorage.getItem("todo-list"));
        if(!todos){ // if todos doesn't exist, pass an empty aray.
            todos = [];
        }
        taskInput.value = "";
        let taskInfo = {name: userTask, status:"pending"};
        todos.push(taskInfo); // adding new task to todos.
        localStorage.setItem("todo-list", JSON.stringify(todos)); 
        //
    }
})