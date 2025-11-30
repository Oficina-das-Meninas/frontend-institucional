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

export interface CreateUserRequest {
  name: string;
  email: string;
  document: string;
  password: string;
  phone: string;
}

export interface UpdateUserDto {
  id: string;
  name?: string;
  email?: string;
  document?: string;
  password?: string;
  phone?: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  document: string;
  phone: string;
}

export interface SponsorshipDto {
  id: string;
  billingDay: number;
  startDate: string;
  isActive: boolean;
  cancelDate?: string;
}
