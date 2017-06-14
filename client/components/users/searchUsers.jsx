import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { searchUserAction, getAllUsersAction } from '../../actions/userActions';

export class SearchUsers extends React.Component {

  constructor(props) {
    super(props);
    this.state = { search: '' };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    event.preventDefault();
    let word = event.target.value;
    if (!word && word.length === 0) {
      return getAllUsersAction();
    }
    word = word.trim();
    this.props.searchUserAction(word);
  }

  render() {
    return (
      <div>
        <form onChange={this.onChange}>
          <div className="input-field">
            <input
              id="search"
              type="search"
              placeholder="search by name or username"
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    );
  }
}

SearchUsers.propTypes = {
  searchUserAction: PropTypes.func.isRequired,
};

export default withRouter(connect(null,
  { searchUserAction })(SearchUsers));
