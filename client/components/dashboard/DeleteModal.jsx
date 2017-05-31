import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-materialize';
import { deleteDocumentAction } from '../../actions/documentActions';

class DeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }


  handleDelete(documentId) {
    this.props.deleteDocumentAction(documentId);
  }

  render() {
    return (
      <Modal
        trigger={
          <button className="btn-floating waves-effect red accent-4 white-text">
            <i className="material-icons">delete</i>
          </button>
        }
        actions={
          <div>
            <Button
              onClick={() => this.handleDelete(this.props.document.id)}
              waves="light" className="red darken-2"
            >delete</Button>
            <Button flat modal="close" waves="light">dismiss</Button>
          </div>
          }
      > Are you sure you want to delete this document?
      <i className="material-icons yellow accent-4 white-text">warning</i>
      </Modal>
    );
  }
}

export default connect(null, { deleteDocumentAction })(DeleteModal);
