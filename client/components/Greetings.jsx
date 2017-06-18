/* eslint-env browser */
import React from 'react';

/**
 * render landing page
 * @class Greetings
 * @extends {React.Component}
 */
class Greetings extends React.Component {

  /**
   * This method runs when the components mounts
   * 
   * @memberof Greetings
   */
  componentDidMount() {
    $(document).ready(() => {
      $('.button-collapse').sideNav();
    });
  }
  /**
   * renders landing page
   * 
   * @returns {path} landing page
   * 
   * @memberof Greetings
   */
  render() {
    return (
      <div>
        
        <div className="landing-page">
          <div className="landing-page-text">
            <h3 className="center">
            Bring your office to Papyrus
            </h3>
            <h4 className="center">
                Store, share and manage all your files on the cloud.</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Greetings;

