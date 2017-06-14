import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Pagination } from 'react-materialize';
import { getmyDocumentsAction }
  from '../../actions/documentActions';
import MyDocumentsCards from './MyDocumentsCards';
import AddModal from './MyDocumentsAddModal';

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
    const userId = this.props.location.state.id;
    this.props.getmyDocumentsAction(userId, offset);
  }

  onSelect(pageNumber) {
    const userId = this.props.state.authentication.userInfo.id;
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
    return (
      <div className="row">
        <div className="col s12 m12 l12">
          <h5 className="center-align">My Documents</h5>
          {
            (this.props.documents.documents &&
            this.props.documents.documents.length > 0)
            ?
              this.props.documents.documents.map(MyDocumentsCards)
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
  location: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, {
  getmyDocumentsAction })(MyDocumentsTemplate));
