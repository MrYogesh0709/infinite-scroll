import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPostsPage = async (pageNum = 1, options = {}) => {
  const response = await api.get(`/posts?_page=${pageNum}`, options);
  return response.data;
};
