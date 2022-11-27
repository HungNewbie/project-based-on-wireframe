
  

let test = new TaskManager(0);
console.log(test);
const regEx = /^[A-Za-z\s]*$/;
function validateTaskForm() {
    function validName() {
        let userInput = document.getElementById("name").value;
        if (!regEx.test(userInput) && userInput.length < 8) {
            document.getElementById("valid").innerHTML = "Must have at least 8 characters, only contains letters";
            return false;
        }
        else if (!regEx.test(userInput)) {
            document.getElementById("valid").innerHTML = "Only contains letters";
            return false;
        }
        else if (regEx.test(userInput) && userInput.length < 8) {
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
        const taskDescription = document.querySelector('#taskDescription');
        let taskDescriptionValue = taskDescription.value;
        if (taskDescriptionValue.length >= 15) {
            taskDescription.classList.add("is-valid");
            taskDescription.classList.remove("is-invalid");
        } else {
            taskDescription.classList.add("is-invalid");
            taskDescription.classList.remove("is-valid");
        }
    }
    validDes();


    function validAssign() {
        const element = document.getElementById("assign").value;
        if (!regEx.test(element) && element.length < 8) {
            document.getElementById("errorMsg").innerHTML = "8 characters minimum, only contains letters";
            return false;
        } else if (!regEx.test(element)) {
            document.getElementById("errorMsg").innerHTML = "Only contains a combination of letters";
            return false;
        } else if (regEx.test(element) && element.length < 8) {
            document.getElementById("errorMsg").innerHTML = "8 characters minimum";
            return false;
        }
        else {
            document.getElementById("errorMsg").innerHTML = "";
            return true;
        }
    }
    validAssign();
    addAndDisplay();
}

function currentDate() {
    const el = document.getElementById('date');
    const current = new Date();
    const day = current.getDate();
    const month = current.getMonth() + 1;
    const year = current.getFullYear();
    // returns the final date with backslash (/) separator
    const date = `${day}/${month}/${year}`;
    el.innerHTML = date;
}
currentDate(); //Calling the current date function





const form = document.getElementById("form");
form.addEventListener("submit",validateTaskForm)

console.log(test.loadUserInputToScreen());
function addAndDisplay() {
    test.addNewTask(taskName.value, description.value, assign.value, dueDate.value, curStatus.value);
    test.saveUserInput();
    test.displayTask();
    }
 