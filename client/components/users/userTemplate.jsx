import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Pagination } from 'react-materialize';
import { getAllUsersAction } from '../../actions/userActions';
import userCards from './userCards';
import SearchUsers from './searchUsers';

class UserTemplate extends React.Component {

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.props.getAllUsersAction(0);
  }

  onSelect(pageNumber) {
    console.log('======pagenumber', pageNumber);
    const offset = (pageNumber - 1) * 2;
    console.log('======offset', offset);
    this.props.getAllUsersAction(offset);
  }

  render() {
    console.log(this.props.users);
    let pageCount;
    let currentPage;
    const settings = this.props.users.settings;
    if (settings) {
      pageCount = settings.pages;
      currentPage = settings.currentPage;
    }
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
        <Pagination
          items={pageCount} activePage={currentPage} maxButtons={10}
          onSelect={this.onSelect}
        />
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

export default connect(mapStateToProps, {
  getAllUsersAction })(UserTemplate);
