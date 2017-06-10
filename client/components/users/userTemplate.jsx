import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Pagination } from 'react-materialize';
import { getAllUsersAction } from '../../actions/userActions';
import userCards from './userCards';
import SearchUsers from './searchUsers';

class UserTemplate extends React.Component {

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  componentWillMount() {
    this.props.getAllUsersAction(0);
  }

  onSelect(pageNumber) {
    const offset = (pageNumber - 1) * 2;
    this.props.getAllUsersAction(offset);
  }

  render() {
    let pageCount;
    let currentPage = 0;
    const settings = this.props.users.settings;
    if (settings) {
      pageCount = settings.pages;
      currentPage = settings.currentPage;
    }
    const maxPages = pageCount || 0;
    return (
      <div className="col s12 m12 l12">
        <SearchUsers />
        <h3>Manage Users</h3>
        {
          (this.props.users.users &&
           this.props.users.users.length > 0)
          ?
            this.props.users.users.map(userCards)
          :
          'You have no users to manage.'
        }
        {
          (this.props.users.users &&
           this.props.users.users.length > 0)
          ?
            <Pagination
              items={pageCount} activePage={currentPage} maxButtons={maxPages}
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
  users: state.users,
});

UserTemplate.propTypes = {
  getAllUsersAction: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, {
  getAllUsersAction })(UserTemplate));
