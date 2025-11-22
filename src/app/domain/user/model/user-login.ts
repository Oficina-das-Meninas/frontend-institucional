export interface User {
  id: string;
  name: string;
  isAdmin: boolean;
}

export interface LoginResponse {
  user: User;
  expiresIn: number;
}

export interface LoginRequest {
  email?: string;
  password?: string;
}
