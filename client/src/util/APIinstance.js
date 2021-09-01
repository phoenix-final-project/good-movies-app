import axios from 'axios';

const axiosApiInstance = axios.create();

axiosApiInstance.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axiosApiInstance.defaults.headers.post['Content-Type'] = 'application/json';

export default axiosApiInstance;
