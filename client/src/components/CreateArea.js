import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea({ fetchNotes }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    note_title: "",
    note_content: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const submitNote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      if (response.ok) {
        setNote({
          note_title: "",
          note_content: "",
        });
        fetchNotes(); // Refresh notes after successfully adding a new note
      } else {
        console.error("Failed to add note:", response.statusText);
      }
    } catch (err) {
      console.error("Error adding note:", err.message);
    }
  };

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="note_title"
            onChange={handleChange}
            value={note.note_title}
            placeholder="Title"
          />
        )}
        <textarea
          name="note_content"
          onClick={() => setExpanded(true)}
          onChange={handleChange}
          value={note.note_content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
