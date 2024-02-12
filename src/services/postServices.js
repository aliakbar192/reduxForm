import http from './httpService';
import config from '../config';
const { apiUrl } = config;
const apiEndpoint = `${apiUrl}/posts`;

async function getAllPost() {
    return await http.get(apiEndpoint);
}
async function createPost(body) {
    return await http.post(apiEndpoint, body);
}

export default {
    getAllPost,
    createPost,
};
