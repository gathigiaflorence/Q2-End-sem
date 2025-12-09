const STORAGE_KEY = "simple-notes-app";
let notes = [];

const noteForm = document.getElementById("note-form");
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");
const notesList = document.getElementById("notesList");

function loadNotes() {
    const saved = localStorage.getItem(STORAGE_KEY);
    notes = saved ? JSON.parse(saved) : [];
}

function saveNotes() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function createNoteCard(note) {
    const card = document.createElement("div");
    card.className = "note-card";
    card.dataset.id = note.id;
    card.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <button data-action="delete">Delete</button>
    `;
    return card;
}

function renderNotes() {
    notesList.innerHTML = "";
    notes.forEach(note => {
        const card = createNoteCard(note);
        notesList.appendChild(card);
    });
}

function addNote(title, content) {
    const note = { id: Date.now().toString(), title, content };
    notes.push(note);
    saveNotes();
    renderNotes();
}

function deleteNote(id) {
    notes = notes.filter(n => n.id !== id);
    saveNotes();
    renderNotes();
}

noteForm.addEventListener("submit", e => {
    e.preventDefault();
    addNote(titleInput.value.trim(), contentInput.value.trim());
    noteForm.reset();
});

notesList.addEventListener("click", e => {
    if (e.target.dataset.action === "delete") {
        const id = e.target.parentElement.dataset.id;
        deleteNote(id);
    }
});

loadNotes();
renderNotes();
