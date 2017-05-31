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
        <h1 className="center row container grey-text text-darken-3 lighten-3">
          Bring your office to Papyrus
        </h1>
        <div className="parallax-container">
          <div className="parallax">
            <img src={image1} alt="" />
          </div>
        </div>
        <div className="section white">
          <div className="row container">
            <h2 className="center grey-text text-darken-3 lighten-3">
              Store, share and manage all your files on the cloud.</h2>
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

