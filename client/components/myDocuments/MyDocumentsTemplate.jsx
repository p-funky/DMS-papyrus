import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Pagination } from 'react-materialize';
import { getmyDocumentsAction }
  from '../../actions/documentActions';
import MyDocumentsCards from '../commonToDocuments/DocumentCards';
import AddModal from '../commonToDocuments/AddModal';
import SearchDocuments from '../commonToDocuments/SearchDocuments';

export class MyDocumentsTemplate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      authentication: {
        userInfo: {
          id: ''
        }
      }
    };

    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    const offset = 0;
    const userId = this.props.user.userId;
    this.props.getmyDocumentsAction(userId, offset);
  }

  onSelect(pageNumber) {
    const userId = this.props.user.userId;
    const offset = (pageNumber - 1) * 8;
    this.props.getmyDocumentsAction(userId, offset);
  }

  render() {
    let pageCount;
    let currentPage = 0;
    const pageSettings = this.props.documents.settings;
    if (pageSettings) {
      pageCount = pageSettings.pages;
      currentPage = pageSettings.currentPage;
    }
    const maxPages = pageCount || 0;
    const userId = this.props.user.userId;
    return (
      <div className="row">
        <div className="col s12 m12 l12">
          <SearchDocuments userId={this.props.user.userId} />
          <h5 className="center-align">My Documents</h5>
          {
            (this.props.documents.documents &&
            this.props.documents.documents.length > 0)
            ?
              this.props.documents.documents
              .map(document => MyDocumentsCards(document, userId))
            :
              <h2 className="grey-text accent-4">You have no documents to view</h2>
          }
          <AddModal />
        </div>
        <div className="center-align">
          {
            (this.props.documents.documents &&
            this.props.documents.documents.length > 0)
            ?
              <Pagination
                items={pageCount} activePage={currentPage} maxButtons={maxPages}
                onSelect={this.onSelect}
              />
            :
              ''
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  documents: state.documents,
  profile: state.profile,
  user: state.authentication.userInfo,
  state
});

MyDocumentsTemplate.propTypes = {
  getmyDocumentsAction: PropTypes.func.isRequired,
  documents: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, {
  getmyDocumentsAction })(MyDocumentsTemplate));
