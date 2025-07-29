import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { Fab } from "@mui/material";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({ title: "", content: "" });

  useEffect(() => {
    if (props.editingNote) {
      setNote(props.editingNote);
      setExpanded(true);
    }
  }, [props.editingNote]);

  function handleChange(e) {
    const { name, value } = e.target;
    setNote(prev => ({ ...prev, [name]: value }));
  }

  function resetForm() {
    setNote({ title: "", content: "" });
    setExpanded(false);
    props.onCancelEdit();
  }

  function submitNote(e) {
    e.preventDefault();
    if (!note.title.trim() && !note.content.trim()) return;

    if (props.editIndex !== null) {
      props.onUpdate(note, props.editIndex);
    } else {
      props.onAdd(note);
    }
    resetForm();
  }

  const isEditing = props.editIndex !== null;

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            className="note-input note-title"
            name="title"
            value={note.title}
            onChange={handleChange}
            placeholder="Title"
          />
        )}
        <textarea
          className="note-textarea"
          name="content"
          onClick={() => setExpanded(true)}
          value={note.content}
          onChange={handleChange}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        {isExpanded && (
          <div className="note-icons">
            <Fab
              className="icon-btn save-btn"
              size="small"
              onClick={submitNote}
            >
              {isEditing ? <SaveIcon /> : <AddIcon />}
            </Fab>
            {isEditing && (
              <Fab
                className="icon-btn cancel-btn"
                size="small"
                onClick={resetForm}
              >
                <CancelIcon />
              </Fab>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default CreateArea;
