import React from 'react';
import { connect } from 'react-redux';
import { getAllDocumentsAction }
  from '../../actions/documentActions';
import documentCards from './documentCards';
import AddModal from './AddModal';

class DashboardTemplate extends React.Component {

  constructor(props) {
    super(props);
    this.props.getAllDocumentsAction();
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {
          this.props.documents.documents
          ?
            this.props.documents.documents.map(documentCards)
          :
            'No document'
        }
        <AddModal />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  documents: state.documents,
});

export default connect(mapStateToProps, {
  getAllDocumentsAction })(DashboardTemplate);
