import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
          (this.props.documents.documents &&
           this.props.documents.documents.length > 0)
          ?
            this.props.documents.documents.map(documentCards)
          :
            'You have no documents to view'
        }
        <AddModal />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  documents: state.documents,
});

DashboardTemplate.propTypes = {
  getAllDocumentsAction: PropTypes.func.isRequired,
  documents: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {
  getAllDocumentsAction })(DashboardTemplate);
