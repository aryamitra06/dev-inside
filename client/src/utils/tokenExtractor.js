import decode from 'jwt-decode';

const token = localStorage.getItem("token");

export const tokenGetter = () => {
    return token;
}

export const idGetter = () => {
    if (token) {
        const decodedToken = decode(token);
        return decodedToken?.user?.id;
    }
}
export const avatarGetter = () => {
    if(token){
        const decodedToken = decode(token);
        return decodedToken?.user?.avatar;
    }
}
export const nameGetter = () => {
    if(token){
        const decodedToken = decode(token);
        return decodedToken?.user?.name;
    }
}