import React, { Component } from 'react';

import { Image, Header, Button } from 'semantic-ui-react';

import GithubUsersTable from './components/GithubUsersTable';

import GithubUsersAPI from './api/GithubUsersAPI';

import './App.css';

class App extends Component {

  state = {
    users: [],
    sinceId: 0,
  };

  componentDidMount() {    
    GithubUsersAPI.findAllUsersSince(this.state.sinceId)
      .then(response => this.setState({ users: response }) );
  }

  handleNextClick = () => {
    const nextSinceId = this.getNextSinceId()

    GithubUsersAPI.findAllUsersSince(nextSinceId)
      .then(response => this.setState({ users: response }) )
      .then(() => this.changeNextSinceId());
  }

  changeNextSinceId = () => {
    const nextSinceId = this.getNextSinceId()

    this.setState({ sinceId: nextSinceId })
  }

  getNextSinceId() {
    const { users } = this.state

    if(users.length === 0) return 0;

    const lastUser = users[users.length - 1]
    return lastUser.id
  }

  isPreviousBtnDisabled = (sinceId) => {
    return (sinceId === 0);
  }

  handlePreviousClick = () => {

  }

  render() {
    const headerImageStyle = {
      paddingTop: '20px'
    };

    const btnStyle = {
      minWidth: '100px'
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

        <Button 
          onClick={this.handlePreviousClick} 
          color='red' style={btnStyle} 
          disabled={this.isPreviousBtnDisabled(this.state.sinceId)}>Previous</Button>
        
        <Button onClick={this.handleNextClick} color='teal' style={btnStyle}>Next</Button>
        
        <GithubUsersTable users={this.state.users} />
      </div>
    );
  }

}

export default App;
