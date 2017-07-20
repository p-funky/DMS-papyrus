import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Pagination } from 'react-materialize';
import { getAllUsersAction } from '../../actions/userActions';
import UserCards from './UserCards';
import SearchUsers from '../common/Search';

/**
 * render the user template
 * @class UserTemplate
 * @extends {React.Component}
 */
export class UserTemplate extends React.Component {
  /**
   * Creates an instance of UserTemplate.
   * @param {object} props
   *
   * @memberOf UserTemplate
   */
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }
  /**
   * This method runs when the components mounts
   * 
   * @memberof Greetings
   */
  componentWillMount() {
    this.props.getAllUsersAction(0);
  }

  /**
   * This method getting users by pagination
   *
   * @param {integer} pageNumber
   *
   * @memberof UserTemplate
   */
  onSelect(pageNumber) {
    const offset = (pageNumber - 1) * 8;
    this.props.getAllUsersAction(offset);
  }

  /**
   * renders the user page template
   * 
   * @returns {template} user page
   * 
   * @memberof UserTemplate
   */
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
      <div className="row">
        <div className="col s12 m12 l12">
          <SearchUsers userId={1} />
          <h5 className="center-align">Manage Users</h5>
          {
            (this.props.users.users &&
            this.props.users.users.length > 0)
            ?
              this.props.users.users.map(UserCards)
            :
              <h2 className="grey-text accent-4">You have no users to manage.</h2>
          }
        </div>
        <div className="center-align">
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
      </div>
    );
  }
}

/**
 * mapStateToProps
 *
 * @param {object} state
 * @returns {object} users
 */
const mapStateToProps = state => ({
  users: state.users,
});

UserTemplate.propTypes = {
  getAllUsersAction: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, {
  getAllUsersAction })(UserTemplate));
