import React from 'react';
import PropTypes from 'prop-types';

/**
 * Form Input
 *
 * @param {Object} props { title, accessId, onChange, content, handleAccessChange, onSubmit, documentId }
 * @returns {Object} jsx object
 */
const Form = ({ title, accessId, onChange, content, handleAccessChange, onSubmit, documentId }) =>
  <form className="col s12">
    <div className="row">
      <div className="row">
        <div className="input-field col s6">
          <i className="material-icons prefix">input</i>
          <input
            id="title"
            name="title"
            type="text"
            className="validate"
            value={title}
            onChange={onChange}
          />
          <label className="active" htmlFor="title">title</label>
        </div>
        <div className="input-field col s6">
          <select
            id="access"
            className="browser-default"
            value={accessId}
            onChange={handleAccessChange}
          >
            <option value={1}>public</option>
            <option id="private" value={2}>private</option>
            <option value={3}>role</option>
          </select>
        </div>
      </div>
    </div>
    <div className="input-field col s12">
      <i className="material-icons prefix">mode_edit</i>
      <textarea
        id="content"
        name="content"
        className="material-text-area"
        value={content}
        onChange={onChange}
      />
    </div>
    <div className="row">
      <button
        onClick={documentId ? () => onSubmit(documentId) : onSubmit}
        className="modal-close btn blue lighten-2 waves-effect waves-light right"
        type="button"
        name="action"
        id="save"
      >save
        <i className="mdi-content-send right" />
      </button>
    </div>
  </form>;

Form.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  documentId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  accessId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  handleAccessChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Form;
