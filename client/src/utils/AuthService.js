// currently not in use
class AuthService {
    login(data) {
        localStorage.setItem("user", JSON.stringify(data.user));
    }

    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();