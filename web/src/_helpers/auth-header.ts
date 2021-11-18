export function authHeader(): string {
    // return authorization header with jwt token

    try {

        const user = (localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')!) : null;

        if (user && user.token) {
            return 'Bearer ' + user.token;
        } else {
            return '';
        }

    } catch (error) {
        return '';
    }
}