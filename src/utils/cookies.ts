import Cookies from 'js-cookie';


const TOKEN_KEY = 'saecta_token';


export const setAuthCookie = (token: string) => {
  Cookies.set(TOKEN_KEY, token, {
    expires: 7, 
    secure: true, 
    sameSite: 'strict' 
  });
};


export const getAuthCookie = () => {
  return Cookies.get(TOKEN_KEY);
};


export const removeAuthCookie = () => {
  Cookies.remove(TOKEN_KEY);
};