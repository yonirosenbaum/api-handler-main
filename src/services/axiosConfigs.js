import axios from "axios";
import { API_BASE_URL } from "src/services/constants";

const axiosParams = {
  baseURL: API_BASE_URL,
  //set timeout as needed
  timeout: 10000,
  //adjust headers as needed
  headers: {},
};

const axiosInstance = axios.create(axiosParams);

const errorHandler = (error) => {
  const statusCode = error.response?.status;

  if (statusCode && statusCode !== 401) {
    console.error(error);
  }
  return Promise.reject(error);
};

const api = (axios) => {
  return {
    get: (url, config = {}) => withAbort(axios.get)(url, config),
    post: (url, config = {}) => withAbort(axios.post)(url, config),
    put: (url, config = {}) => withAbort(axios.put)(url, config),
    patch: (url, config = {}) => withAbort(axios.patch)(url, config),
    delete: (url, config = {}) => withAbort(axios.delete)(url, config),
  };
};

const withAbort =
  (fn) =>
  async (...args) => {
    const originalConfig = args[args.length - 1];
    let { abort, ...config } = originalConfig;

    if (typeof abort === "function") {
      const { cancel, token } = axios.CancelToken.source();
      config.cancelToken = token;
      abort(cancel);
    }

    try {
      return await fn(...args.slice(0, args.length - 1), config);
    } catch (error) {
      axios.isCancel(error) && (error.aborted = true);
      throw error;
    }
  };

axiosInstance.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});

export default api(axiosInstance);
