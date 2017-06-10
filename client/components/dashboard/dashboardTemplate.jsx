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

class DashboardTemplate extends React.Component {

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
    const offset = (pageNumber - 1) * 3;
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
      <div className="col s12 m12 l12">
        <SearchDocuments />
        <h3>All Documents</h3>
        {
          (this.props.documents.documents &&
           this.props.documents.documents.length > 0)
          ?
            this.props.documents.documents.map(documentCards)
          :
            'You have no documents to view'
        }
        <AddModal />
        <Pagination
          items={pageCount} activePage={currentPage} maxButtons={maxPages}
          onSelect={this.onSelect}
        />
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
