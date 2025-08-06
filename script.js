
console.log("Welcome to Magic notes app. Write your notes here.");
showNotes();

let myBtn = document.getElementById('myBtn');

myBtn.addEventListener('click', function (e) {
    let textArea = document.getElementById('textarea');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(textArea.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));

    textArea.value = " ";
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    console.log(notesObj);
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="noteBox">
        <h3 class="noteHeading">Note ${index + 1}</h3>
        <p class="paraHeading">${element}</p>
        <button class="buttonHeading" onclick="editNote(${index})">Edit Note</button>
        <button class="buttonHeading" onclick="deleteNote(${index})">Delete Note</button>
        </div>`;
    });
    let notesElem = document.getElementById('notes');
    if (notesObj.length !== 0) {
        notesElem.innerHTML = html;
    } else {
        notesElem.innerHTML = `Nothing to show, create a new note from "Add a note" section above.`;
    }
}

function editNote(index) {
    let notes = localStorage.getItem('notes');
    let notesObj = JSON.parse(notes);
    let editedNote = prompt("Edit your note:", notesObj[index]);
    if (editedNote !== null) { // If user didn't cancel
        notesObj[index] = editedNote;
        localStorage.setItem('notes', JSON.stringify(notesObj));
        showNotes();
    }
}

function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('search');
search.addEventListener('input', function () {
    let inputVal = search.value;
    let noteBoxs = document.getElementsByClassName('noteBox');
    Array.from(noteBoxs).forEach(function (element) {
        let boxTxt = element.querySelector('.paraHeading').textContent;
        if (boxTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})
