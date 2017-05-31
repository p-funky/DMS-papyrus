import React from 'react';
import { Modal } from 'react-materialize';

class viewModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Modal
        trigger={
          <div>
            <button className="btn-floating waves-effect modal-trigger green accent-4 white-text">
              <i className="large material-icons">visibility</i>
            </button>
          </div>
        }
      >
        {this.props.document.content}
      </Modal>
    );
  }
}

export default viewModal;
