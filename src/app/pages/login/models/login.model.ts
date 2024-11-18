export interface Login {
    user: string;
    password: string;
  }

  export interface Session {
    token: string;
    userID: string;
    nameUser: string;
  }

  export interface User {
    userID: string;
    username: string;
    password: string;
    nameUser: string;
    lastName: string;
    token: string;
  }