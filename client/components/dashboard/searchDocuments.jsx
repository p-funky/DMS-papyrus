import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchDocumentsAction, getAllDocumentsAction }
  from '../../actions/documentActions';

class SearchDocuments extends React.Component {

  constructor(props) {
    super(props);
    this.state = { search: '' };
    this.onChange = this.onChange.bind(this);
    this.runSearch = this.runSearch.bind(this);
  }

  onChange(event) {
    let word = event.target.value;
    if (!word || word === '') {
      return getAllDocumentsAction();
    }
    word = word.trim();
    this.setState({ [event.target.id]: word });
  }

  runSearch(event) {
    event.preventDefault();
    this.props.searchDocumentsAction(this.state.search);
  }
  render() {
    return (
      <div>
        <form onChange={this.onChange} onSubmit={this.runSearch}>
          <div className="input-field">
            <input
              id="search"
              type="search"
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
};

export default connect(null,
  { searchDocumentsAction })(SearchDocuments);
