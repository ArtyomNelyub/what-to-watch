import { UserData } from '../types/user';

type ShortUserData = Omit<UserData, 'id' | 'token'>;

const USER_NAME = 'wtw-user-name';
const USER_EMAIL = 'wtw-user-email';
const USER_AVATAR_UTL = 'wtw-user-avatar-url';

export const getUserData = (): ShortUserData | null => {
  const userName = localStorage.getItem(USER_NAME);
  const userEmail = localStorage.getItem(USER_EMAIL);
  const userAvatarURL = localStorage.getItem(USER_AVATAR_UTL);

  if (userName && userEmail && userAvatarURL) {
    return { avatarUrl: userAvatarURL, email: userEmail, name: userName };
  }

  return null;
};

export const saveUserData = (userData: ShortUserData): void => {
  localStorage.setItem(USER_NAME, userData.name);
  localStorage.setItem(USER_EMAIL, userData.email);
  localStorage.setItem(USER_AVATAR_UTL, userData.avatarUrl);
};

export const dropUserData = (): void => {
  localStorage.removeItem(USER_NAME);
  localStorage.removeItem(USER_EMAIL);
  localStorage.removeItem(USER_AVATAR_UTL);
};
