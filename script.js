let addData = document.getElementById("taskInputBtn");
let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");
let btnText = addData.innerText;

let userArray = [];

let edit_id = null;

let objstr = localStorage.getItem("users");

if (objstr !== null) {
  userArray = JSON.parse(objstr);
}

addData.addEventListener("click", function () {
  let task = taskInput.value;
  if (edit_id != null) {
    userArray.splice(edit_id, 1, { task: task });
    edit_id = null;
  } else {
    userArray.push({ task: task });
  }
  SaveInfo(userArray);
  taskInput.value = "";
  addData.innerText = btnText;
});

function SaveInfo(userArray) {
  let str = JSON.stringify(userArray);
  localStorage.setItem("user", str);
  displayInfo();
}

function displayInfo() {
  let statement = "";
  userArray.forEach((user, i) => {
    statement += `<tr><td scope="row">${i + 1}</td> <td>${
      user.task
    }</td> <td><i class="btn btn-warning text-white fa fa-edit mx-2" onclick="editUser(${i})"   ></i><i class="btn btn-danger text-white fa fa-trash " onclick="deleteUser(${i})" ></i></td></tr>`;
  });
  taskList.innerHTML = statement;
}

function editUser(id) {
  edit_id = id;
  taskInput.value = userArray[id].task;
  addData.innerText = "Update";
}

function deleteUser(id) {
  userArray.splice(id, 1);
  SaveInfo(userArray);
}
