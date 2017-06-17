import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchDocumentsAction }
  from '../../actions/documentActions';

export class SearchDocuments extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    event.preventDefault();
    let word = event.target.value;
    word = word.trim();
    const location = this.props.location.pathname;
    if (location === '/my-docs') {
      this.props.searchDocumentsAction(word, this.props.userId, location);
    } else if (location === '/dashboard') {
      this.props.searchDocumentsAction(word, false, location);
    }
  }

  render() {
    return (
      <div>
        <form onChange={this.onChange}>
          <div className="input-field">
            <input
              id="search"
              type="search"
              placeholder="search by title or content"
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

SearchDocuments.propTypes = {
  searchDocumentsAction: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired
};

export default withRouter(connect(null,
  { searchDocumentsAction })(SearchDocuments));
