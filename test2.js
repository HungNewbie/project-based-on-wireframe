//Creating the card format to display on the browser

const createTaskHtml = (
    id,
    username,
    descriptionBox,
    assignedTo,
    dueDate,
    validateStatus
  ) => {
    const newForm = ` 
    <div class="card text-left mx-3 mb-4 mt-4" style="width: 18rem; box-shadow: 4px 4px ; background-color: rgba(210, 114, 105, 0.5);" data-task-id=${id} >
  <div class="card-body">
    <h5 class="card-title">Name:  ${username}</h5>
      <p class="card-subtitle mb-2 mt-1">Description:  ${descriptionBox}</p>
       <h6 class="card-subtitle mb-2 mt-1">Due Date:  ${dueDate}</h6>
      <h6 class="card-subtitle mb-2 mt-1" id="assignedToInput">Assignee:  ${assignedTo}</h6>
      <h6 class="card-subtitle mb-2 mt-1">Status:  ${validateStatus}</h6>
      <div class="row">
      <div class="col mt-3">
        <a href="#" class="btn btn-danger delete-button ml-3">Delete</a>
      </div>
      <div class="col mt-3">
       <a href="#" class="btn btn-success done-button ${validateStatus == "Done" ? "d-none" : ""}">Mark as Done</a>
      </div>
    </div>
  </div>
  </div>`;
  
    return newForm;
  };
  
  //Creating class to add task
  class TaskManager {
    constructor(currentId = 0) {
      this.tasks = [];
      this.currentId = currentId;
    }
    //Add the task to array
    addTask(username, descriptionBox, assignedTo, dueDate, validateStatus) {
      const task = {
        id: this.currentId++,
        username: username,
        descriptionBox: descriptionBox,
        assignedTo: assignedTo,
        dueDate: dueDate,
        validateStatus: validateStatus,
      };
  
      this.tasks.push(task);
      console.log(
        `${task.id} \n ${task.username}\n ${task.descriptionBox}\n ${task.assignedTo}\n ${task.dueDate} \n ${task.validateStatus}`
      );
      return task;
    }
  
    // Getting the task by id
  
    getTaskById(taskId) {
      let objTask;
      for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];
  
        if (task.id === taskId) {
          objTask = task;
        }
      }
  
      return objTask;
    }
  
    //Displaying Task function
   
       render() {
        let todo = [];
        let review = [];
        let inprogress = [];
        let done = [];
    
        for (let i = 0; i < this.tasks.length; i++) {
          const task = this.tasks[i];
    
          const date = new Date(task.dueDate);
          const formattedDate =
            date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    
          const taskHtml = createTaskHtml(
            task.id,
            task.username,
            task.descriptionBox,
            task.assignedTo,
            formattedDate,
            task.validateStatus
          );
          switch (task.validateStatus) {
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
          console.log(task.validateStatus);
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
      
        const tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem("tasks", tasksJson);
    
        const currentId = String(this.currentId);
        localStorage.setItem("currentId", currentId);
      }
    
      loadStorage() {
        
        let storageOutput = localStorage.getItem("tasks");
        let storageId = localStorage.getItem("currentId");
        
        if (storageOutput) {
          const tasksJson = localStorage.getItem("tasks");
          this.tasks = JSON.parse(tasksJson);
        }
    
        if (storageId) {
          const currentId = localStorage.getItem("currentId");
          this.currentId = Number(currentId);
        }
      }
  
      //Delete the task from local storage
  
      deleteTask(taskId) {
        const newTasks = [];
        
        for (let i = 0; i < this.tasks.length; i++) {
          const task = this.tasks[i];
    
          if (task.id !== taskId) {
            newTasks.push(task);
            }
    
          }
          this.tasks = newTasks;
        }
    }
  
    //Object Instance to the class

let taskManager = new TaskManager(0);
console.log(taskManager);

//Loads data in local storage
taskManager.loadStorage();


const form = document.getElementById('form');
const username = document.getElementById('name');
const descriptionBox = document.getElementById('description');
const assignedTo = document.getElementById('assignedTo');
const dueDate = document.getElementById('duedate');
const validateStatus = document.getElementById('status');
const submitBtn = document.getElementById('btnSubmit');



let today =  new Date();
 var dd = ("0" + today.getDate()).slice(-2);
 var mm = today.getMonth()+1; 
 var yyyy = today.getFullYear();
    if(mm<10)  {
         mm='0'+mm;
     }
 today = yyyy + "-" + mm + "-" + dd;
  

  const regEx = /^[A-Za-z\s]*$/;
// Form Validation Logic
  function submitForm (event) {

    event.preventDefault(); 
  
    function validName() {
    if (username.value.length <= 8 || username.value === "" ) {
      
      document.getElementById('error-name').innerHTML = "Must have at least 8 characters.";
      return false;
      }
      else if (!regEx.test(username.value)) {
      document.getElementById("error-name").innerHTML = "Only contains letters";
      return false;    
      }
      else {
        document.getElementById("error-name").innerHTML = "";
        return true;
      }
    }
    validName();

    function validDes() {
    if ( descriptionBox.value.length <= 15 || descriptionBox.value === "") {
     
      document.getElementById('error-description').innerHTML = "Must have at least 15 characters.";
      return false;
    }
    else {
      document.getElementById('error-description').innerHTML = "";
      return true;
    }
  }
  validDes();

  function validAssign() {
    if (assignedTo.value.length <= 8 || assignedTo.value === "" ) {
     
      document.getElementById('error-assignee').innerHTML= 'Must have at least 8 characters.';
      return false;
    }
    else if (!regEx.test(assignedTo.value)) {
      document.getElementById("error-assignee").innerHTML = "Only contains letters";
      return false;    
      }
      else {
        document.getElementById('error-assignee').innerHTML= "";
        return true;
      }
    }
    validAssign();


      function validDate() {
    if (dueDate.value < today) {  
    document.getElementById('error-date').innerHTML = "Error! Due date must be later than today.";
    return false;
    }
    else {
      document.getElementById('error-date').innerHTML = "";
      return true;
    }
  }
  validDate();

    function validStatus() {
    if (validateStatus.selectedIndex === 0) {
      document.getElementById('error-status').innerHTML = 'Please select an option';
      return false;
    }
    else {
      document.getElementById('error-status').innerHTML = "";
      return true;
    }
  }
  validStatus();

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
  
  taskManager.addTask(username.value, descriptionBox.value, assignedTo.value, dueDate.value, validateStatus.value);
  taskManager.saveStorage();
  taskManager.render();
       
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
  
  if (event.target.classList.contains("done-button")) {

    const parentTask = event.target.parentElement.parentElement.parentElement.parentElement;
    
    const taskId = Number(parentTask.dataset.taskId);
    
    const task = taskManager.getTaskById(taskId);
    
    task.validateStatus = "Done";    
    
    //Save locally
    taskManager.saveStorage();
    //Display task
    taskManager.render();
         
  }

  //Function to delete task in browser

  if (event.target.classList.contains("delete-button")) {

    if (confirm("Are you sure you want to delete this task?")) {
      const parentTask =event.target.parentElement.parentElement.parentElement.parentElement;
      const taskId = Number(parentTask.dataset.taskId);
      taskManager.deleteTask(taskId);

      //Save locally
      taskManager.saveStorage();
      //Display task
      taskManager.render();
      }
  }
}

taskManager.saveStorage();
taskManager.render();
  
function clearInput() {
  document.getElementById("form").reset();
}