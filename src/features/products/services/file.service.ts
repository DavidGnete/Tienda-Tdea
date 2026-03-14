import axiosClient from '@/lib/axios';

export interface UploadFileResponse {
  secure_url: string;
}

export const fileService = {
  uploadProductImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await axiosClient.post<UploadFileResponse>('/file/product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data.secure_url;
  },
};
