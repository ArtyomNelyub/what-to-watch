import { ShortUserData } from '../types/user';

const USER_NAME = 'wtw-user-name';
const USER_EMAIL = 'wtw-user-email';
const USER_AVATAR_UTL = 'wtw-user-avatar-url';
const AUTH_TOKEN_KEY_NAME = 'what-to-watch-token';

export const getUserData = (): ShortUserData | null => {
  const userName = localStorage.getItem(USER_NAME);
  const userEmail = localStorage.getItem(USER_EMAIL);
  const userAvatarURL = localStorage.getItem(USER_AVATAR_UTL);
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);

  if (userName && userEmail && userAvatarURL && token) {
    return { 
      avatarUrl: userAvatarURL, 
      email: userEmail, 
      name: userName, 
      token: token,
    };
  }

  return null;
};

export const saveUserData = (userData: ShortUserData): void => {
  localStorage.setItem(USER_NAME, userData.name);
  localStorage.setItem(USER_EMAIL, userData.email);
  localStorage.setItem(USER_AVATAR_UTL, userData.avatarUrl);
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, userData.token);
};

export const dropUserData = (): void => {
  localStorage.removeItem(USER_NAME);
  localStorage.removeItem(USER_EMAIL);
  localStorage.removeItem(USER_AVATAR_UTL);
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME)
};
