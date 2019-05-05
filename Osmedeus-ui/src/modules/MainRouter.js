import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import { Router, Route, browserHistory } from 'react-router';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';
import LoginPage from './Login';
import HomePage from '../pages/HomePage';
import SettingsPage from '../pages/SettingsPage';
import Testing1 from '../pages/Testing1';
import Testing2 from '../pages/Testing2';
import Testing3 from '../pages/Testing3';
import Payloads from '../pages/Payloads';
import PassiveAnalyze from '../pages/PassiveAnalyze';
import ActiveAnalyze from '../pages/ActiveAnalyze';
import Execute from '../pages/Execute';

import Configurations from '../pages/Configurations';
import Summary from '../containers/Summary/Summary';
import Log from '../containers/Logs/Log';
import Report from '../containers/Reports/Report';

export default class MainRouter extends Component {
  constructor() {
    super();
    this.state = {
      navOpenState: {
        isOpen: true,
        width: 304,
      }
    }
  }

  getChildContext () {
    return {
      navOpenState: this.state.navOpenState,
    };
  }

  appWithPersistentNav = () => (props) => (
    <App
      onNavResize={this.onNavResize}
      {...props}
    />
  )

  onNavResize = (navOpenState) => {
    this.setState({
      navOpenState,
    });
  }

  render() {
    return (
      <Router history={browserHistory}>
        
        <Route component={this.appWithPersistentNav()}>

          <Route path="/configurations" component={Configurations} />
          <Route path="/testing3" component={Testing3} />


          <Route path="/" component={LoginPage}>
            {/* <Route path="/" component={HomePage} /> */}
            <Route path="/home" component={HomePage} />
            <Route path="/summary" component={Summary} />
            <Route path="/report" component={Report} />
            <Route path="/logs" component={Log} />

            <Route path="/execute" component={Execute} />

            <Route path="/payloads" component={Payloads} />
            <Route path="/passive" component={PassiveAnalyze} />
            <Route path="/active" component={ActiveAnalyze} />
            <Route path="/login" component={LoginPage} />
          </Route>
        </Route>


      </Router>
    );
  }
}

MainRouter.childContextTypes = {
  navOpenState: PropTypes.object,
}
