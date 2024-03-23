import axios from 'axios';
import { API_KEY } from '@env';

const AUTH_OPTIONS = {
  SIGN_IN_WITH_PASSWORD: 'signInWithPassword',
  SIGN_UP: 'signUp',
};
const getBaseUrl = (authOption) => {
  return `https://identitytoolkit.googleapis.com/v1/accounts:${authOption}?key=${API_KEY}`;
};
async function authenticate({ authOption, requestOptions }) {
  const response = await axios.post(getBaseUrl(authOption), {
    returnSecureToken: true,
    ...requestOptions,
  });
  return response.data;
}

export function createUser({ email, password }) {
  return authenticate({
    authOption: AUTH_OPTIONS.SIGN_UP,
    requestOptions: {
      email,
      password,
    },
  });
}

export function validateUser({ email, password }) {
  return authenticate({
    authOption: AUTH_OPTIONS.SIGN_IN_WITH_PASSWORD,
    requestOptions: {
      email,
      password,
    },
  });
}
