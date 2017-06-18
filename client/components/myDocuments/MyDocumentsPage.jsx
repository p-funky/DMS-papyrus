import React from 'react';
import MyDocumentsTemplate from './MyDocumentsTemplate';

/**
 * render my documents page
 * @class MyDocumentsPage
 * @extends {React.Component}
 */
class MyDocumentsPage extends React.Component {
  /**
   * renders the my documents page
   * 
   * @returns {path} my documents page
   * 
   * @memberof MyDocumentsPage
   */
  render() {
    return (
      <div className="row">
        <MyDocumentsTemplate />
      </div>
    );
  }
}

export default MyDocumentsPage;
