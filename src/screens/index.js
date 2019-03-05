
import React from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom";

import UsersScreen from './UsersScreen';


const ScreensRoot = () => (
  <Router>
    <Route path="/" exact component={UsersScreen} />
  </Router>
);

export default ScreensRoot;
