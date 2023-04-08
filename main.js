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


// Dynamic Search Filter

const AllTableRows = document.querySelectorAll('#records tr');
const DynamicSearchInput = document.getElementById("DynamicSearch");

DynamicSearchInput.addEventListener("input" , (e)=>{
   records.innerHTML = ""
   // console.log(e.target.value);
   const searchStr = e.target.value.toLowerCase()
  AllTableRows.forEach(tr => {
   let DataInRows = tr.querySelectorAll("td");
   console.log(DataInRows[0].innerText);
   if(DataInRows[0].innerText.toLowerCase().indexOf(searchStr) > -1){
      records.appendChild(tr);
   }
  })
  if(records.innerHTML == ""){
   records.innerHTML = " No records Found "
  }
})


