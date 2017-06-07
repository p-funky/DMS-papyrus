import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { Pagination } from 'react-materialize';
import { getmyDocumentsAction }
  from '../../actions/documentActions';
import MyDocumentsCards from './MyDocumentsCards';
import AddModal from '../dashboard/AddModal';

class MyDocumentsTemplate extends React.Component {

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    const user = jwt.decode(localStorage.token);
    const userId = user.userId;
    const offset = 0;
    this.props.getmyDocumentsAction(userId, offset);
  }

  onSelect(pageNumber) {
    const user = jwt.decode(localStorage.token);
    const userId = user.userId;
    console.log('======pagenumber', pageNumber);
    const offset = (pageNumber - 1) * 3;
    console.log('======offset', offset);
    this.props.getmyDocumentsAction(userId, offset);
  }

  render() {
    console.log(this.props.documents);
    let pageCount;
    let currentPage;
    const pageSettings = this.props.documents.settings;
    if (pageSettings) {
      pageCount = pageSettings.pages;
      currentPage = pageSettings.currentPage;
    }
    return (
      <div className="col s12 m12 l12">
        <h3>My Documents</h3>
        {
          (this.props.documents.documents &&
           this.props.documents.documents.length > 0)
          ?
            this.props.documents.documents.map(MyDocumentsCards)
          :
            <h2 className="grey-text accent-4">You have no documents to view</h2>
        }
        <AddModal />
        {
          (this.props.documents.documents &&
           this.props.documents.documents.length > 0)
          ?
            <Pagination
              items={pageCount} activePage={currentPage} maxButtons={10}
              onSelect={this.onSelect}
            />
          :
            ''
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  documents: state.documents,
  profile: state.profile
});

MyDocumentsTemplate.propTypes = {
  getmyDocumentsAction: PropTypes.func.isRequired,
  documents: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {
  getmyDocumentsAction })(MyDocumentsTemplate);
