

function newCardboard(id, taskName, description, assign, dueDate, curStatus) {
    const addItem = `<div class="card" style="width: 18rem;" data-task-id=${id}>\n      
        <div class="card-body">\n 
            <h5 class="card-title">Name: ${taskName}</h5>\n 
            <p class="card-text">Description: ${description}</p>\n 
           <p class="card-text">Assign to: ${assign}</p>\n   
            <p class="card-text">Due Date: ${dueDate}</p>\n   
            <p class="card-text">Status: ${curStatus}</p>\n    
            <a href="#" class="btn btn-primary">Delete</a>\n 
       </div>\n
    </div>\n 
    '<br/>`;
   // return addItem;
    const itemsContainer = document.getElementById("list-items");
    itemsContainer.innerHTML += addItem;
}

// new class name TaskManager that accept newTask as an array and new id.
class TaskManager {
    constructor(currentid = 0) {
    this.newTask = [];
    this.currentid = currentid;
}
// Add new task to an array name taskArr using push method.
  addNewTask(taskName, description, assign, dueDate, curStatus) {
    const taskArr = { id: this.currentid++,
      taskName: taskName,
    description: description,
    assign: assign,
    dueDate: dueDate,
    curStatus: curStatus,
    };
    this.newTask.push(taskArr);
    return taskArr;
  };
  // Create a new method to get the task ID base on the index of newTask array
  getAnIDfortask(newID) {
    let taskWithID;
    for (let index = 0; index < this.newTask.length; index++) {
        const newTask = this.newTask[index];
        if (newTask.id === newID) {
            taskWithID = newTask;
        }
    }
    return taskWithID;
  }
  //create a method to display task on the cardboard
  displayTask() {
    for (let index = 0; index < this.newTask.length; index++) {
        const newTask = this.newTask[index];
        newCardboard(newTask.id, newTask.taskName, newTask.description,
            newTask.assign, newTask.dueDate, newTask.curStatus);
            console.log(newCardboard);
    }
  }
  saveUserInput() {
    form.addEventListener('submit', (event1) => {
      event1.preventDefault();
    const json = JSON.stringify(this.newTask);
       localStorage.setItem('newTask', json);
    const currentid = JSON.stringify(this.currentid);
       localStorage.setItem('currentid', currentid);
    })
      }
  loadUserInputToScreen() {
    let taskOutput = localStorage.getItem("newTask");
    if (taskOutput) {
      this.newTask = JSON.parse(taskOutput);
    }
    let idOutput = localStorage.getItem("currentid");
    if (idOutput) {
      this.currentid = Number(idOutput);
    }
    console.log(taskOutput);
    console.log(idOutput);
  }
  
}
let taskOutput = localStorage.getItem("newTask");
console.log(taskOutput);
const test1 = newCardboard({'name': `${taskOutput.taskName}`,
    
'description':`${taskOutput.description}`,
'assign':`${taskOutput.assign}`,
'dueDate':`${taskOutput.date}`,
'status':`${taskOutput.curStatus}`,
})



  
