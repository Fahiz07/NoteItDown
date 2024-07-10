import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function EditModal(props) {
  const [note, setNote] = useState(props.note);

  useEffect(() => {
    setNote(props.note);
  }, [props.note]);

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  const handleSave = () => {
    props.onSave(note.note_id, {
      note_title: note.note_title,
      note_content: note.note_content,
    });
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="note_title"
              value={note.note_title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="note_content"
              value={note.note_content}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;
