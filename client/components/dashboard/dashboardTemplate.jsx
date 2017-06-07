import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Pagination } from 'react-materialize';
import { getAllDocumentsAction }
  from '../../actions/documentActions';
import documentCards from './documentCards';
import AddModal from './AddModal';

class DashboardTemplate extends React.Component {

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    const offset = 0;
    this.props.getAllDocumentsAction(offset);
  }

  onSelect(pageNumber) {
    console.log('======pagenumber', pageNumber);
    const offset = (pageNumber - 1) * 3;
    console.log('======offset', offset);
    this.props.getAllDocumentsAction(offset);
  }

  render() {
    console.log(this.props.documents);
    let pageCount;
    let currentPage;
    const settings = this.props.documents.settings;
    if (settings) {
      pageCount = settings.pages;
      currentPage = settings.currentPage;
    }
    return (
      <div className="col s12 m12 l12">
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
          items={pageCount} activePage={currentPage} maxButtons={10}
          onSelect={this.onSelect}
        />
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
