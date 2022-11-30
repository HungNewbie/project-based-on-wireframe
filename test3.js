//Object Instance to the class
const createTaskHtml = (
    id,
    userInput,
    description,
    assign,
    dueDate,
    curStatus
  ) => {
    const newForm = ` 
    <div class="card text-left mx-3 mb-4 mt-4" style="width: 18rem; box-shadow: 4px 4px ; background-color: rgba(235, 214, 205, 0.774);" data-task-id=${id} >
  <div class="card-body">\n 
  <h5 class="card-title">Name: ${userInput}</h5>\n 
  <p class="card-text">Description: ${description}</p>\n 
 <p class="card-text">Assign to: ${assign}</p>\n   
  <p class="card-text">Due Date: ${dueDate}</p>\n   
  <p class="card-text">Status: ${curStatus}</p>\n    
  <a href="#" class="btn btn-danger delete-button">Delete</a>
  </div>
      <div class="col mt-3">
       <a href="#" class="btn btn-success done-button ${curStatus == "Done" ? "d-none" : ""}">Done</a>
      </div>
    </div>
  </div>
  </div>`;
  
    return newForm;
  };
  
  //Creating class to add task
  class TaskManager {
    constructor(currentid = 0) {
    this.newTask = [];
    this.currentid = currentid;
    }
    //Add the task to array
    addNewTask(userInput, description, assign, dueDate, curStatus) {
        const taskArr = { id: this.currentid++,
        userInput: userInput,
        description: description,
        assign: assign,
        dueDate: dueDate,
        curStatus: curStatus,
        }; 
      this.newTask.push(taskArr);
      console.log(
        `${taskArr.id} \n ${taskArr.userInput}\n ${taskArr.description}\n ${taskArr.assign}\n ${taskArr.dueDate} \n ${taskArr.curStatus}`
      );
      console.log(taskArr.curStatus);
      return taskArr;
    }
  
    // Getting the task by id
    getAnIDfortask(newID) {
    let taskWithID;
    for (let index = 0; index < this.newTask.length; index++) {
        const taskArr = this.newTask[index];
        if (taskArr.id === newID) {
            taskWithID = taskArr;
        }
    }
    return taskWithID;
  }
    //Displaying Task function
   
       render() {
        let todo = [];
        let review = [];
        let inprogress = [];
        let done = [];
    
        for (let i = 0; i < this.newTask.length; i++) {
          const taskArr = this.newTask[i];
    
          const date = new Date(taskArr.dueDate);
          const formattedDate =
            date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    
          const taskHtml = createTaskHtml(
            taskArr.id,
            taskArr.userInput,
            taskArr.description,
            taskArr.assign,
            formattedDate,
            taskArr.curStatus
          );
          switch (taskArr.curStatus) {
            case "To Do":
              todo.push(taskHtml);
              break;
            case "In Progress":
              inprogress.push(taskHtml);
              break;
            case "Review":
              review.push(taskHtml);
              break;
            case "Done":
              done.push(taskHtml);
              break;
 
          }
          console.log(taskArr.assign);
        }
        const todoHTML = todo.join("\n");
        const reviewHTML = review.join("\n");
        const inprogressHTML = inprogress.join("\n");
        const doneHTML = done.join("\n");
        document.querySelector("#todo").innerHTML = todoHTML;
        document.querySelector("#review").innerHTML = reviewHTML;
        document.querySelector("#inprog").innerHTML = inprogressHTML;
        document.querySelector("#done").innerHTML = doneHTML;
      }
  
      //Saving the data in Local storage
      saveStorage() {
      
        const tasksJson = JSON.stringify(this.newTask);
        localStorage.setItem("newTask", tasksJson);
    
        const currentid = String(this.currentid);
        localStorage.setItem("currentid", currentid);
      }
    
      loadStorage() {
        
        let storageOutput = localStorage.getItem("newTask");
        let storageId = localStorage.getItem("currentid");
        
        if (storageOutput) {
          const tasksJson = localStorage.getItem("newTask");
          this.newTask = JSON.parse(tasksJson);
        }
    
        if (storageId) {
          const currentid = localStorage.getItem("currentid");
          this.currentid = Number(currentid);
        }
      }
  
      //Delete the task from local storage
  
      deleteTask(newID) {
        const newTasks = [];
        
        for (let i = 0; i < this.newTask.length; i++) {
          const taskArr = this.newTask[i];
    
          if (taskArr.id !== newID) {
            newTasks.push(task);
            }
    
          }
          this.newTask = newTasks;
        }
    }



let taskManager = new TaskManager(0);
console.log(taskManager);

//Loads data in local storage
taskManager.loadStorage();

//Getting the input values from Form 
const form = document.getElementById('form');
const userInput = document.getElementById("name");
const descriptionValue = document.getElementById("description");
const assigned = document.getElementById("assign");
const validDate = document.getElementById("dueDate");
const curStatus = document.getElementById('status');
const submitBtn = document.getElementById('btnSubmit');

//Selected due date should be greater then current date

let today =  new Date();
 var dd = ("0" + today.getDate()).slice(-2);
 var mm = today.getMonth()+1; 
 var yyyy = today.getFullYear();
    if(mm<10)  {
         mm='0'+mm;
     }
 today = yyyy + "-" + mm + "-" + dd;
  
  console.log(today);
  console.log(dueDate.value);
  

  const regEx = /^[A-Za-z\s]*$/;
// Form Validation Logic
  function submitForm (event) {

  event.preventDefault(); 
 
  function validName() {
    
    if (!regEx.test(userInput.value) && userInput.value.length < 8) {
        document.getElementById("valid").innerHTML = "Must have at least 8 characters, only contains letters";
        return false;
    }
    else if (!regEx.test(userInput.value)) {
        document.getElementById("valid").innerHTML = "Only contains letters";
        return false;
    }
    else if (regEx.test(userInput.value) && userInput.value.length < 8) {
        document.getElementById("valid").innerHTML = "Must have at least 8 characters.";
        return false;
    }
    else {
        document.getElementById("valid").innerHTML = "";
        return true;
    }
}
validName();

function validDate() {
  let validDate = document.getElementById("dueDate").value;
    const currentDate = new Date();
    validDate = new Date(validDate)
    if (validDate < currentDate) {
        document.getElementById("valid1").innerHTML = "Error! Due date must be later than today.";
        return false;
    }
    else if (isNaN(validDate)) {
        document.getElementById("valid1").innerHTML = "Please enter a date";
        return false;
    }
    else {
        document.getElementById("valid1").innerHTML = "";
        return true;
    }
}
validDate();

function validDes() {
if (descriptionValue.value.length < 15) {
    document.getElementById("valid2").innerHTML = "Must have at least 15 characters";
    return false;
}
else {
    document.getElementById("valid2").innerHTML = "";
    return true;
}
}
validDes();


function validAssign() {

    if (!regEx.test(assigned.value) && assigned.value.length < 8) {
        document.getElementById("errorMsg").innerHTML = "8 characters minimum, only contains letters";
        return false;
    } else if (!regEx.test(assigned.value)) {
        document.getElementById("errorMsg").innerHTML = "Only contains a combination of letters";
        return false;
    } else if (regEx.test(assigned.value) && assigned.value.length < 8) {
        document.getElementById("errorMsg").innerHTML = "8 characters minimum";
        return false;
    }
    else {
        document.getElementById("errorMsg").innerHTML = "";
        return true;
    }
}
validAssign();
 //Adding functions to submit button
  toAddTasks();

};

//Event handler for submit button
form.addEventListener("submit",submitForm)


//Displaying current date on landing page
function currentDate () {
  const el = document.getElementById('date');
  const current= new Date();
  const day =  current.getDate();
  const month = current.getMonth()+1;
  const year = current.getFullYear();
  
  // returns the final date with backslash (/) separator
  const date = `${day}/${month}/${year}`;
  el.textContent = date;

}
currentDate(); //Calling the current date function

//Function to combine all other function 
function toAddTasks() {
  
  taskManager.addNewTask(userInput.value, descriptionValue.value, assigned.value, validDate.value, curStatus.value);
  taskManager.saveStorage();
  taskManager.render();
       console.log(curStatus.value);
       console.log(userInput.value);
}

/// Mark as Done

let todolist = document.querySelector("#todo");
let review = document.querySelector("#review");
let inprogress = document.querySelector("#inprog");
let done = document.querySelector("#done");

// click events!

todolist.addEventListener("click", updateStatus);
review.addEventListener("click", updateStatus);
inprogress.addEventListener("click", updateStatus);
done.addEventListener("click", updateStatus);

//Function to mark status as done

function updateStatus(event) {
  
 /* if (event.target.classList.contains("done-button")) {

    const parentTask = event.target.parentElement.parentElement.parentElement.parentElement;
    
    const newID = Number(parentTask.dataset.newID);
    
    const task = taskManager.getAnIDfortask(newID);
    
    task.curStatus = "Done";    
    
    //Save locally
    taskManager.saveStorage();
    //Display task
    taskManager.render();
         
  }*/

  //Function to delete task in browser

  if (event.target.classList.contains("delete-button")) {

    if (confirm("Are you sure you want to delete this task?")) {
      const parentTask = event.target.parentElement.parentElement.parentElement.parentElement;
      const newID = Number(parentTask.dataset.newID);
      taskManager.deleteTask(newID);

      //Save locally
      taskManager.saveStorage();
      //Display task
      taskManager.render();
      }
  }
}

taskManager.saveStorage();
taskManager.render();
  