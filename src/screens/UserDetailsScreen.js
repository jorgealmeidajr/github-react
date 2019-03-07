
import React, { Component, Fragment } from 'react';

import { Card, Placeholder, Image, Button, Container, Header, Modal, List, Segment, Icon } from 'semantic-ui-react';

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

	handleOpenReposModal = () => {
		const username = this.props.match.params.username;

		GithubUsersAPI.findUserRepositories(username)
			.then(response => this.setState({ 
				repositories: response, 
				repositoriesModalVisible: !this.state.repositoriesModalVisible 
			}) );
	}

	handleCloseReposModal = () => {
		this.setState({ repositoriesModalVisible: !this.state.repositoriesModalVisible });
	}
	
	render() {
		const {user, loading, error, repositories, repositoriesModalVisible} = this.state;

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
							<Button disabled={loading} primary style={btnCardStyle} onClick={this.handleOpenReposModal}>Repos !</Button>
						</Card.Content>
					</Card>
				)}

				{(error !== null) && (
          <Segment placeholder inverted color='red' size='huge'>
            <Header icon>
              <Icon name='bug' />
              {`${error}`}<br />
              Problem while loading user details from GitHub.
            </Header>
          </Segment>
        )}

				{(user !== null) && (
				<Modal open={repositoriesModalVisible} size='large' onClose={this.handleCloseReposModal}>
					<Modal.Header>User Repositories List</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							<Header>Login: {user.login}</Header>
							
							<List divided relaxed>
							{repositories.map(repo => (
								<List.Item key={repo.id}>
									<List.Icon name='github' size='large' verticalAlign='middle' />
									<List.Content>
										<List.Header as='a'>{repo.html_url}</List.Header>
										<List.Description as='a'>{repo.name}</List.Description>
									</List.Content>
								</List.Item>
							))}
								
							</List>
						</Modal.Description>
					</Modal.Content>
				</Modal>
				)}
			</Container>
		)
	}
    
}

export default UserDetailsScreen;
