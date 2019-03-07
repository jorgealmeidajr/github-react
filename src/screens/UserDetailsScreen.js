
import React, { Component, Fragment } from 'react';

import { Card, Placeholder, Image, Button, Container, Header } from 'semantic-ui-react';

import GithubUsersAPI from '../api/GithubUsersAPI';


class UserDetailsScreen extends Component {

	state = {
		user: null,
		loading: true,
		error: null,
		repositories: [],
		repositoriesModalVisible: false
	};

	componentDidMount() {    
		const username = this.props.match.params.username;

		GithubUsersAPI.findUserDetails(username)
			.then(response => this.setState({ user: response, loading: false }) )
			.catch(error => this.setState({ error }) );
	}
	
	render() {
		const {user, loading, error} = this.state;

		const containerStyle = {
			marginTop: '10px',
			paddingTop: '10px'
		};

		const cardStyle = {
			marginLeft: 'auto',
			marginRight: 'auto',
			minWidth: '350px'
		};

		const btnCardStyle = {
			width: '120px'
		};

		return (
			<Container style={containerStyle}>
				<Header as='h1'>GitHub User Details</Header>

				{(error === null) && (
					<Card style={cardStyle}>
						{loading ? (
							<Placeholder>
								<Placeholder.Image square />
							</Placeholder>
						) : (
							<Image src={user.avatar_url} />
						)}

						<Card.Content>
							{loading ? (
								<Placeholder>
									<Placeholder.Header>
										<Placeholder.Line length='very short' />
										<Placeholder.Line length='medium' />
									</Placeholder.Header>
									<Placeholder.Paragraph>
										<Placeholder.Line length='short' />
									</Placeholder.Paragraph>
								</Placeholder>
							) : (
								<Fragment>
									<Card.Header>{user.login}</Card.Header>
									<Card.Meta>{user.date_login_creation}</Card.Meta>
									<Card.Description>{user.profile_url}</Card.Description>
								</Fragment>
							)}
						</Card.Content>

						<Card.Content extra>
							<Button disabled={loading} primary style={btnCardStyle}>Repos >></Button>
							<Button disabled={loading} primary style={btnCardStyle}>Repos !</Button>
						</Card.Content>
					</Card>
				)}
			</Container>
		)
	}
    
}

export default UserDetailsScreen;
