
import axios from 'axios'

export default class GithubUsersAPI {

    static findAllUsersSince(since) {
        return axios.get(`http://localhost:4000/api/users?since=${since}`)
            .then((response) => response.data)
    }

}
