
import React, { Component } from 'react';

import GithubUsersAPI from '../api/GithubUsersAPI';


class UserDetailsScreen extends Component {

	state = {
		user: {},
		error: null
	};

	componentDidMount() {    
		GithubUsersAPI.findUserDetails(this.props.match.params.username)
			.then(response => this.setState({ user: response }) )
			.catch(error => this.setState({ error }) );
	}
	
	render() {
		return (
			<React.Fragment>
				user details screen<br />
				{JSON.stringify(this.state.user)}
			</React.Fragment>
		)
	}
    
}

export default UserDetailsScreen;
