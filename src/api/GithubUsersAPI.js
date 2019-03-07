
import axios from 'axios'

export default class GithubUsersAPI {

	static findAllUsersSince(since) {
		return axios.get(`http://localhost:4000/api/users?since=${since}`)
			.then((response) => response.data)
	}

	static findUserDetails(username) {
		return axios.get(`http://localhost:4000/api/users/${username}/details`)
			.then((response) => response.data)
	}

	static findUserRepositories(username) {
		return axios.get(`http://localhost:4000/api/users/${username}/repos`)
			.then((response) => response.data)
	}

}
