export class UserSession {
  static setToken(token) {
    localStorage.setItem('token', token);
  }
  static updateUserName(name) {
    localStorage.setItem('name', name );
  }
  static getUserName() {
    return localStorage.getItem('name');
  }

  static saveUserData(user) {
    return new Promise((resolve, reject) => {
      try {
        this.updateUserName(user.name);
        localStorage.setItem('id', user.id);
        localStorage.setItem('email', user.email);
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });

  }

  static getUserData() {
    return {
      email: localStorage.getItem('email'),
      name: this.getUserName(),
      id: localStorage.getItem('id'),
    };
  }

  static getUserToken() {
    return localStorage.getItem('token');
  }

  static isAuth() {
    return this.getUserToken() !== 'undefined' && this.getUserToken() !== null;
  }

  static destroySession() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
  }

}
