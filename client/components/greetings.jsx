/* eslint-env browser */
import React from 'react';
import image1 from '../images/documentImage.jpg';
import image2 from '../images/documents.jpg';

class Greetings extends React.Component {
  componentDidMount() {
    $(document).ready(() => {
      $('.parallax').parallax();
    });
  }
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

