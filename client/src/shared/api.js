import axios from 'axios';

const HOST = `http://localhost:5000`;

class API {
  async getUsers() {
    const { data } = await axios.get(HOST + '/api/users');

    return data;
  }

  async createUser(userData) {
    const { data } = await axios.post(HOST + '/api/users', userData);

    return data;
  }

  async editUser(userId) {
    const { data } = await axios.put(HOST + `/api/users/${userId}`);

    return data;
  }

  async deleteUser(userId) {
    const { data } = await axios.delete(HOST + `/api/users/${userId}`);

    return data;
  }
}

const api = new API();

export default api;
