import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote(newNote) {
    setNotes(prevNotes => [...prevNotes, newNote]);
  }

  function deleteNote(id) {
    setNotes(prevNotes => prevNotes.filter((note, index) => index !== id));
  }

  function updateNote(updatedNote, index) {
    setNotes(prevNotes =>
      prevNotes.map((note, i) => (i === index ? updatedNote : note))
    );
    setEditingNote(null);
    setEditIndex(null);
  }

  function startEditing(note, index) {
    setEditingNote(note);
    setEditIndex(index);
  }

  function cancelEditing() {
    setEditingNote(null);
    setEditIndex(null);
  }

  return (
    <div>
      <Header />
      <CreateArea
        onAdd={addNote}
        onUpdate={updateNote}
        editingNote={editingNote}
        editIndex={editIndex}
        onCancelEdit={cancelEditing}
      />
      {notes.map((noteItem, index) => (
        <Note
          key={index}
          id={index}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
          onEdit={startEditing}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
