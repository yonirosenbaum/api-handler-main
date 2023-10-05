import api from "src/services/axiosConfigs";

export const listUsers = (config) => {
  return api.get("users", config).then((res) => res.data);
};

export const getUser = (userId, config) => {
  return api.get(`users/${userId}`, config).then((res) => res.data);
};

export const queryUser = (query, config) => {
  return api
    .get("/users", { ...config, params: query })
    .then((res) => res.data);
};
