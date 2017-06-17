import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Pagination } from 'react-materialize';
import { getAllDocumentsAction }
  from '../../actions/documentActions';
import DocumentCards from '../common/DocumentCards';
import AddDashboardModal from '../common/AddModal';
import SearchDashboardDocuments from '../common/Search';

export class DashboardTemplate extends React.Component {

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  componentWillMount() {
    const offset = 0;
    this.props.getAllDocumentsAction(offset);
  }

  componentWillUnmount() {
    this.props.state.documents = { documents: [], settings: {} };
  }

  onSelect(pageNumber) {
    const userId = this.props.user.userId;
    const offset = (pageNumber - 1) * 8;
    this.props.getAllDocumentsAction(userId, offset);
  }

  render() {
    const userId = this.props.user.userId;
    let pageCount;
    let currentPage;
    const settings = this.props.documents.settings;
    if (settings) {
      pageCount = settings.pages;
      currentPage = settings.currentPage;
    }
    const maxPages = pageCount || 0;
    return (
      <div className="row">
        <div className="col s12 m12 l12">
          <SearchDashboardDocuments
            userId={this.props.user.userId}
          />
          <h5 id="dashboardWelcome" className="center-align">All Documents</h5>
          {
            (this.props.documents.documents &&
            this.props.documents.documents.length > 0)
            ?
              this.props.documents.documents
                .map(document => DocumentCards(document, userId))
            :
              <h2 className="grey-text accent-4">You have no documents to view</h2>
          }
          <AddDashboardModal />
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
  state,
  user: state.authentication.userInfo
});

DashboardTemplate.propTypes = {
  getAllDocumentsAction: PropTypes.func.isRequired,
  documents: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, {
  getAllDocumentsAction })(DashboardTemplate));
