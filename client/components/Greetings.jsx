/* eslint-env browser */
import React from 'react';
import image1 from '../images/documentImage.jpg';
import image2 from '../images/documents.jpg';

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
      $('.parallax').parallax();
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
        <h3 className="center row container grey-text text-darken-3 lighten-3">
          Bring your office to Papyrus
        </h3>
        <div className="parallax-container">
          <div className="parallax">
            <img src={image1} alt="" />
          </div>
        </div>
        <div className="section white">
          <div className="row container">
            <h4 className="center grey-text text-darken-3 lighten-3">
              Store, share and manage all your files on the cloud.</h4>
          </div>
        </div>
        <div className="parallax-container">
          <div className="parallax">
            <img src={image2} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default Greetings;

