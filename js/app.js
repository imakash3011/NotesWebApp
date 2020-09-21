console.log("Welcome to Notes app");
showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  // console.log("added notes Successfully")
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title:addTitle.value,
    text: addTxt.value
  }
  // notesObj.push(addTxt.value);
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  console.log(notesObj);
  showNotes();
});

// function to show element from the localstorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">          
          <div class="card-body">
        <h5 class="card-title">Note ${element.title}</h5>
        <p class="card-text">${element.text}</p>
        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
      </div> 
    </div> 
    `;
  });
  let  notesElm = document.getElementById('notes');
  if(notesObj.length != 0){
    notesElm.innerHTML = html;
  } else{
    notesElm.innerHTML =`Nothing to Show`;
  }
}
 

// function to delete notes
function deleteNote(index){
    console.log("I am deleting",index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }

    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    
}

let search = document.getElementById('searchTxt');
search.addEventListener('input',function(){
    
    let inputVal = search.value.toLowerCase()
    console.log("input event fired",inputVal)
    // here we are taking each card one after another and we are trying to mathc its content
    let noteCards = document.getElementsByClassName('noteCard')
    Array.from(noteCards).forEach(function(element){
             let cardTxt = element.getElementsByTagName("p")[0].innerText
            // console.log(cardTxt)
            if(cardTxt.includes(inputVal)){
                element.style.display = "block";
            }else{
                element.style.display = "none";
            }
    })
}) 


// features

// addtitle
// mark as important
// separate notes by user
// sync and host with web server
