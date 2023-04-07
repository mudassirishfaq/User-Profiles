const UserInput = document.getElementById("userinput");
const userBtn = document.getElementById("userbtn");
let updateBtn = userBtn.innerText;
let records = document.getElementById("records")
let userArray = [];
let edit_id = null;
let objstr = localStorage.getItem('users');
if (objstr !== null) {
   userArray = JSON.parse(objstr);
}
displayinfo();

userBtn.onclick = () => {
   let name = UserInput.value;
   
   if(edit_id!= null) {
      userArray.splice(edit_id,1,{'name' : name})
      edit_id = null;
   }else{
      userArray.push({'name' : name});
   }
  
  
    saveInfo(userArray);
    UserInput.value = '';
    
   userBtn.innerText = updateBtn;
}

function saveInfo(userArray){
    let constr = JSON.stringify(userArray)
    localStorage.setItem('users' , constr );
    displayinfo();
}

function displayinfo() {
 let DisplayStatement = '';
 userArray.forEach((user , index) => {
    DisplayStatement += ` <tr>
    <th scope="row">${index+1}</th>
    <td>${user.name}</td>
    <td><i class=' btn btn-info mx-3 text-white bx bxs-edit' onclick='editinfo(${index})'></i><i class=' btn btn-danger bx bx-trash'onclick='deleteinfo(${index})'></i></td>
  </tr>`
 })
 records.innerHTML = DisplayStatement;
}

function editinfo(id) {
edit_id = id;
UserInput.value = userArray[id].name;
userBtn.innerText = 'Save Changes'
}

function deleteinfo(id) {
userArray.splice(id,1);
saveInfo(userArray);
displayinfo(userArray);
}
