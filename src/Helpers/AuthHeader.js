export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
      const config = {
        headers: {
          'x-access-token': user.accessToken,
          'Content-Type' : 'application/json'
        }
      }
      return config;
    } else {
      return {};
    }
  }