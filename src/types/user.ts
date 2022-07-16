type Token = string;

export type UserData= {
  avatarUrl: string;
  email: string;
  id: number;
  name: string;
  token: Token;
};

export type ShortUserData = Omit<UserData, 'id'>;

export type UserStatusError = {
  error: string;
};

export type AuthData = {
  email : string;
  password : string;
};

