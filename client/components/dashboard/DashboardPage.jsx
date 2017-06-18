import React from 'react';
import DashboardTemplate from './DashboardTemplate';

/**
 * render dashboard page
 * @class DashboardPage
 * @extends {React.Component}
 */
class DashboardPage extends React.Component {
  /**
   * renders the dashboard page
   * 
   * @returns {path} dashboard page
   * 
   * @memberof DashboardPage
   */
  render() {
    return (
      <div className="row">
        <DashboardTemplate />
      </div>
    );
  }
}

export default DashboardPage;
