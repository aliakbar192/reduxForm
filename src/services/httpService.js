import axios from 'axios';
axios.interceptors.response.use(
    (response) => {
        if (response.status < 200 || response.status > 299) {
            return Promise.reject(response.data.message || 'An error occurred.');
        }
        return response;
    },
    (error) => {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : 'Server Unavailable.';
        return Promise.reject(errorMessage);
    },
);

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};
