export type UserRole = 'user' | 'admin';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  WhattsapNumber: string;
  roles: UserRole[];
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  fullName: string;
  WhattsapNumber: string;
}
