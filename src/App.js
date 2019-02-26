import React, { Component } from 'react';

import { Image, Header, Button } from 'semantic-ui-react';

import GithubUsersTable from './components/GithubUsersTable';

import GithubUsersAPI from './api/GithubUsersAPI';

import './App.css';

class App extends Component {

  state = {
    users: []
  };

  componentDidMount() {
    // TODO: put this in state
    const currentPage = 0;
    
    GithubUsersAPI.findAllUsersSince(currentPage)
      .then(response => this.setState({ users: response }) );
  }

  handleNextClick = () => {
    // TODO: add previous button for pagination
    // TODO: i have to use the last id user
    GithubUsersAPI.findAllUsersSince(45)
      .then(response => this.setState({ users: response }) );
  }

  render() {
    const headerImageStyle = {
      paddingTop: '20px'
    };

    return (
      <div className="App">
        <Header as='h1' style={headerImageStyle}>
          <Image
            src='/img/github-logo.png'
            href='https://github.com/'
            circular
            as='a' size='big' target='_blank'
          /> GitHub Users List
        </Header>

        <Button onClick={this.handleNextClick} color='teal'>Next</Button>
        
        <GithubUsersTable users={this.state.users} />
      </div>
    );
  }

}

export default App;
