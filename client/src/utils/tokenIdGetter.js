import decode from 'jwt-decode';

const token = localStorage.getItem("token");

export const idGetter = () => {
    if (token) {
        const decodedToken = decode(token);
        return decodedToken?.user?.id
    }
}

export const tokenGetter = () => {
    return token;
}