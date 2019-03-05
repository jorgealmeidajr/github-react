
import React from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom";

import UsersScreen from './UsersScreen';
import UserDetailsScreen from './UserDetailsScreen';


const ScreensRoot = () => (
  <Router>
    <div>
      <Route path="/" exact component={UsersScreen} />
      <Route path="/user-details/:username/" exact component={UserDetailsScreen} />
    </div>
  </Router>
);

export default ScreensRoot;
