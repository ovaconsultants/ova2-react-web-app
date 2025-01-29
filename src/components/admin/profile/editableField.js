import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FaPencilAlt } from "react-icons/fa";

const EditableField = ({
  label,
  name,
  value,
  onSave,
  onChange,
  editing,
  setEditing,
  type = "text",
  error = "",
}) => {
  return (
    <div className="col-md-6 text-start">
      <strong className="me-3">{label}:</strong>
      {editing ? (
        <>
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="form-control me-2"
            style={{ maxWidth: "300px" }}
          />
          {error && <p className="text-danger mt-1">{error}</p>}
          <div className="mt-2">
            <button
              className="btn btn-primary me-3"
              onClick={() => onSave(name)}
              disabled={!!error}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="btn btn-danger"
              onClick={() => setEditing(null)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="mb-0 me-3">{value || "Not Provided"}</p>
          <button
            className="btn btn-light btn-sm text-primary"
            onClick={() => setEditing(name)}
          >
            <FaPencilAlt />
          </button>
        </>
      )}
    </div>
  );
};

export default EditableField;
