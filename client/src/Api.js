import axios from 'axios';

const instance = axios.create({
  headers: {
    Accept: 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location = '/login';
    }
    return Promise.reject(error);
  },
);

function parseLinkHeader(response) {
  const link = response.headers?.link;
  if (link) {
    const linkRe = /<([^>]+)>; rel="([^"]+)"/g;
    const urls = {};
    let m;
    while ((m = linkRe.exec(link)) !== null) {
      let url = m[1];
      urls[m[2]] = url;
    }
    return urls;
  }
  return null;
}

const Api = {
  parseLinkHeader,
  assets: {
    create(data) {
      return instance.post('/api/assets', data);
    },
    upload(url, headers, file) {
      return instance.put(url, file, { headers });
    },
  },
  auth: {
    login(email, password) {
      return instance.post('/api/auth/login', { email, password });
    },
    logout() {
      return instance.get('/api/auth/logout');
    },
    register(data) {
      return instance.post('/api/auth/register', data);
    },
  },
  cohorts: {
    index() {
      return instance.get(`/api/cohorts`);
    },
    create(data) {
      return instance.post('/api/cohorts', data);
    },
    get(id) {
      return instance.get(`/api/cohorts/${id}`);
    },
    getInvites(id) {
      return instance.get(`/api/cohorts/${id}/invites`);
    },
    getUsers(id) {
      return instance.get(`/api/cohorts/${id}/users`);
    },
    update(id, data) {
      return instance.patch(`/api/cohorts/${id}`, data);
    },
    delete(id) {
      return instance.delete(`/api/cohorts/${id}`);
    },
  },
  invites: {
    index() {
      return instance.get(`/api/invites`);
    },
    create(data) {
      return instance.post('/api/invites', data);
    },
    createBulk(data) {
      return instance.post('/api/invites/bulk', data);
    },
    get(id) {
      return instance.get(`/api/invites/${id}`);
    },
    accept(id, data) {
      return instance.post(`/api/invites/${id}/accept`, data);
    },
    resend(id) {
      return instance.post(`/api/invites/${id}/resend`);
    },
    revoke(id) {
      return instance.delete(`/api/invites/${id}`);
    },
  },
  tags: {
    index() {
      return instance.get(`/api/tags`);
    },
    create(data) {
      return instance.post('/api/tags', data);
    },
    get(id) {
      return instance.get(`/api/tags/${id}`);
    },
    update(id, data) {
      return instance.patch(`/api/tags/${id}`, data);
    },
    delete(id) {
      return instance.delete(`/api/tags/${id}`);
    },
  },
  organizations: {
    index() {
      return instance.get(`/api/organizations`);
    },
    create(data) {
      return instance.post('/api/organizations', data);
    },
    get(id) {
      return instance.get(`/api/organizations/${id}`);
    },
    update(id, data) {
      return instance.patch(`/api/organizations/${id}`, data);
    },
    delete(id) {
      return instance.delete(`/api/organizations/${id}`);
    },
  },
  programs: {
    index() {
      return instance.get(`/api/programs`);
    },
    create(data) {
      return instance.post('/api/programs', data);
    },
    get(id) {
      return instance.get(`/api/programs/${id}`);
    },
    update(id, data) {
      return instance.patch(`/api/programs/${id}`, data);
    },
    delete(id) {
      return instance.delete(`/api/programs/${id}`);
    },
  },
  passwords: {
    reset(email) {
      return instance.post('/api/passwords', { email });
    },
    get(token) {
      return instance.get(`/api/passwords/${token}`);
    },
    update(token, password) {
      return instance.patch(`/api/passwords/${token}`, { password });
    },
  },
  users: {
    index(page = 1) {
      return instance.get(`/api/users`, { params: { page } });
    },
    me() {
      return instance.get('/api/users/me');
    },
    get(id) {
      return instance.get(`/api/users/${id}`);
    },
    update(id, data) {
      return instance.patch(`/api/users/${id}`, data);
    },
  },
};

export default Api;
