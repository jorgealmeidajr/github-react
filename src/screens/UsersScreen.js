
import React, { Component } from 'react';

import { Image, Header, Button, Segment, Icon } from 'semantic-ui-react';

import GithubUsersTable from '../components/GithubUsersTable';

import GithubUsersAPI from '../api/GithubUsersAPI';


class UsersScreen extends Component {

	state = {
		users: [],
		currentSinceId: 0,
		error: null
	};

	componentDidMount() {    
		this.sinceIdsStack = []

		GithubUsersAPI.findAllUsersSince(this.state.currentSinceId)
			.then(response => this.setState({ users: response }) )
			.catch(error => this.setState({ error }) );
	}

	handleNextClick = () => {
		const nextSinceId = this.getNextSinceId()
		const {currentSinceId}  = this.state

		this.sinceIdsStack.push(currentSinceId)
		
		GithubUsersAPI.findAllUsersSince(nextSinceId)
			.then(response => this.setState({ users: response }) )
			.then(() => this.setState({ currentSinceId: nextSinceId }))
			.catch(error => this.setState({ error }) );
	}

	getNextSinceId() {
		const { users } = this.state

		if(users.length === 0) return 0;

		const lastUser = users[users.length - 1]
		return lastUser.id
	}

	isPreviousBtnDisabled = () => {
		return (this.state.currentSinceId === 0);
	}

	handlePreviousClick = () => {
		let currentSinceId = 0;
		if (this.sinceIdsStack.length !== 0) {
				currentSinceId = this.sinceIdsStack.pop()  
		}
		
		GithubUsersAPI.findAllUsersSince(currentSinceId)
			.then(response => this.setState({ users: response }) )
			.then(() => this.setState({ currentSinceId }))
			.catch(error => this.setState({ error }) );
	}

	render() {
    const headerImageStyle = {
      paddingTop: '20px'
    };

    const btnStyle = {
      minWidth: '100px'
    };

    return (
      <React.Fragment>
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
          disabled={this.isPreviousBtnDisabled()}>Previous</Button>
        
        <Button onClick={this.handleNextClick} color='teal' style={btnStyle}>Next</Button>
        
        {(this.state.error !== null) && (
          <Segment placeholder inverted color='red' size='huge'>
            <Header icon>
              <Icon name='bug' />
              {`${this.state.error}`}<br />
              Problem while loading users from GitHub.
            </Header>
          </Segment>
        )}

        {(this.state.error === null) && (
          <GithubUsersTable users={this.state.users} />
        )}
      </React.Fragment>
    );
	}
	
}

export default UsersScreen;
