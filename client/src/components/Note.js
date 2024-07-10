import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";


function Note(props) {
  
  function handleDelete() {
    props.onDelete(props.note_id);
  }

  function handleEdit() {
    props.onEdit({ note_title: props.note_title, note_content: props.note_content }, props.note_id);
  }

  return (
    <div className="note">
      <h1>{props.note_title}</h1>
      <p>{props.note_content}</p>
      <button onClick={handleEdit}>
        <EditIcon />
      </button>
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
