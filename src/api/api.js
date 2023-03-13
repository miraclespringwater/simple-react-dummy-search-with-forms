import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
});

class ApiResource {
  constructor(path) {
    this.path = path;
  }

  getAll = async (params) => {
    const response = await api.get(this.path, { params });
    return response.data;
  };
}

export default api;
export { ApiResource };
