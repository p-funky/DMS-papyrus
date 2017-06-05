import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { getmyDocumentsAction }
  from '../../actions/documentActions';
import MyDocumentsCards from './MyDocumentsCards';
import AddModal from '../dashboard/AddModal';

class DashboardTemplate extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const user = jwt.decode(localStorage.token);
    const userId = user.userId;
    this.props.getmyDocumentsAction(userId);
  }

  render() {
    return (
      <div className="col s12 m12 l12">
        <h3>My Documents</h3>
        {
          (this.props.documents.documents &&
           this.props.documents.documents.length > 0)
          ?
            this.props.documents.documents.map(MyDocumentsCards)
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
  profile: state.profile
});

DashboardTemplate.propTypes = {
  getmyDocumentsAction: PropTypes.func.isRequired,
  documents: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {
  getmyDocumentsAction })(DashboardTemplate);
