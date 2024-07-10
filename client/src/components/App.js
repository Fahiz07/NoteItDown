import React, { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Note from "./Note";
import EditModal from "./EditModal";

function App() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    note_id: null,
    note_title: "",
    note_content: "",
  });

  const fetchNotes = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/notes`);
      const jsonData = await response.json();
      setNotes(jsonData);
    } catch (err) {
      console.error("Error fetching notes:", err.message);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const deleteNote = async (note_id) => {
    try {
      await fetch(`${apiUrl}/notes/${note_id}`, {
        method: "DELETE",
      });
      setNotes((prevNotes) => prevNotes.filter((noteItem) => noteItem.note_id !== note_id));
    } catch (err) {
      console.error("Failed to delete note:", err.message);
    }
  };

  const editNote = async (note_id, updatedNote) => {
    try {
      const response = await fetch(`${apiUrl}/notes/${note_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      });
      if (response.ok) {
        setNotes((prevNotes) =>
          prevNotes.map((noteItem) =>
            noteItem.note_id === note_id ? { ...noteItem, ...updatedNote } : noteItem
          )
        );
        setShowModal(false);
      } else {
        console.error("Failed to update note.");
      }
    } catch (err) {
      console.error("Error updating note:", err.message);
    }
  };

  const handleEditClick = (note, note_id) => {
    setCurrentNote({
      note_id,
      note_title: note.note_title,
      note_content: note.note_content,
    });
    setShowModal(true);
  };

  return (
    <div>
      <Header />
      <CreateArea fetchNotes={fetchNotes} />
      {notes.map((noteItem) => (
        <Note
          key={noteItem.note_id}
          note_id={noteItem.note_id}
          note_title={noteItem.note_title}
          note_content={noteItem.note_content}
          onDelete={deleteNote}
          onEdit={handleEditClick}
        />
      ))}
      <Footer />
      <EditModal
        show={showModal}
        note={currentNote}
        onHide={() => setShowModal(false)}
        onSave={editNote}
      />
    </div>
  );
}

export default App;
