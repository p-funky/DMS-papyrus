import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Pagination } from 'react-materialize';
import { getAllDocumentsAction }
  from '../../actions/documentActions';
import documentCards from './documentCards';
import AddModal from './AddModal';
import SearchDocuments from './searchDocuments';

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
    const offset = (pageNumber - 1) * 8;
    this.props.getAllDocumentsAction(offset);
  }

  render() {
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
          <SearchDocuments />
          <h5 id="dashboardWelcome" className="center-align">All Documents</h5>
          {
            (this.props.documents.documents &&
            this.props.documents.documents.length > 0)
            ?
              this.props.documents.documents.map(documentCards)
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
  state
});

DashboardTemplate.propTypes = {
  getAllDocumentsAction: PropTypes.func.isRequired,
  documents: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, {
  getAllDocumentsAction })(DashboardTemplate));
