import React, { Component } from 'react';

import GithubUsersTable from './components/GithubUsersTable';

import GithubUsersAPI from './api/GithubUsersAPI';

import './App.css';

class App extends Component {

  state = {
    users: []
  };

  componentDidMount() {
    const currentPage = 0;
    
    GithubUsersAPI.findAllUsersSince(currentPage)
      .then(response => { this.setState({ users: response }) });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          
        </header>
        <GithubUsersTable users={this.state.users} />
      </div>
    );
  }

}

export default App;
