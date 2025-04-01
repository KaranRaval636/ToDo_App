let addData = document.getElementById("taskInputBtn");
let taskInput = document.getElementById("taskInput");
let taskPriority = document.getElementById("taskPriority"); // Get priority dropdown
let taskList = document.getElementById("taskList");
let btnText = addData.innerText;
let darkModeToggle = document.getElementById("darkModeToggle");

let userArray = [];
let edit_id = null;

// Load stored tasks
let objstr = localStorage.getItem("users");
if (objstr !== null) {
  userArray = JSON.parse(objstr);
}

displayInfo();

// Add Task
addData.addEventListener("click", function () {
  let task = taskInput.value;
  let priority = taskPriority.value; // Get selected priority

  if (edit_id != null) {
    userArray.splice(edit_id, 1, { task: task, priority: priority });
    edit_id = null;
  } else {
    userArray.push({ task: task, priority: priority });
  }
  SaveInfo(userArray);
  taskInput.value = "";
  addData.innerText = btnText;
});

// Save Task Data
function SaveInfo(userArray) {
  localStorage.setItem("users", JSON.stringify(userArray));
  displayInfo();
}

// Display Tasks
function displayInfo() {
  let statement = "";
  userArray.forEach((user, i) => {
    statement += `<tr>
                    <td>${i + 1}</td> 
                    <td>${user.task} <span class="badge ${getPriorityClass(
      user.priority
    )}">${user.priority}</span></td> 
                    <td>
                      <i class="btn btn-warning text-white fa fa-edit mx-2" onclick="editUser(${i})"></i>
                      <i class="btn btn-danger text-white fa fa-trash" onclick="deleteUser(${i})"></i>
                    </td>
                  </tr>`;
  });
  taskList.innerHTML = statement;
}

// Get Priority Badge Color
function getPriorityClass(priority) {
  if (priority === "High") return "bg-danger";
  if (priority === "Medium") return "bg-warning";
  return "bg-success"; // Low priority
}

// Edit Task
function editUser(id) {
  edit_id = id;
  taskInput.value = userArray[id].task;
  taskPriority.value = userArray[id].priority; // Load existing priority
  addData.innerText = "Update";
}

// Delete Task
function deleteUser(id) {
  userArray.splice(id, 1);
  SaveInfo(userArray);
}

// Dark Mode Toggle Functionality
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  // Store user preference in localStorage
  let isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
}

// Load Dark Mode Preference
function loadDarkModePreference() {
  let darkModeSetting = localStorage.getItem("darkMode");
  if (darkModeSetting === "true") {
    document.body.classList.add("dark-mode");
  }
}

// Event Listener for Dark Mode Toggle
darkModeToggle.addEventListener("click", toggleDarkMode);

// Load Dark Mode State on Page Load
loadDarkModePreference();
