import https from '../../utils/https';

export class UserService {
  static getUserById(userId) {
    return https.get(`/users/${userId}`);
  }
  static createUser(userData) {
    return https.post('/users', userData);
  }
}