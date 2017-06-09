import React from 'react';
import NavigationBar from './navigationBar.jsx';

/**
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
  /**
   * @returns
   * @memberof App
   */
  render() {
    return (
      <div>
        <NavigationBar />
      </div>
    );
  }
}

export default App;
