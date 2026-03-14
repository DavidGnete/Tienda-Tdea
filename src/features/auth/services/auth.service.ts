import axiosClient from '@/lib/axios';
import type { AuthResponse, LoginDto, RegisterDto } from '../types';

export const authService = {
  login: async (dto: LoginDto): Promise<AuthResponse> => {
    const { data } = await axiosClient.post<AuthResponse>('/auth/login', dto);
    return data;
  },

  register: async (dto: RegisterDto): Promise<AuthResponse> => {
    const { data } = await axiosClient.post<AuthResponse>('/auth/register', dto);
    return data;
  },

  checkStatus: async (): Promise<AuthResponse> => {
    const { data } = await axiosClient.get<AuthResponse>('/auth/check-status');
    return data;
  },
};
