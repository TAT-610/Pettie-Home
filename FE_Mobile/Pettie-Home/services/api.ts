import axios from 'axios';

// Đặt base URL cho mock API
const BASE_URL = 'https://67a8ae906e9548e44fc1b8a3.mockapi.io/editProfile';

interface Profile {
    id: String;
    shopName: String;
    phoneNumber: String;
    description: String;
    email: String;
    birthDate: String;
    address: String;
    openingTime: String;
    closingTime: String;
    avatar: String;
  }

  // Lấy danh sách toàn bộ hồ sơ
export const getProfiles = async (): Promise<Profile[]> => {
    try {
        const response = await axios.get<Profile[]>(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
};

// Lấy thông tin hồ sơ theo ID
export const getProfileById = async (id: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
      throw error;
    }
  };

// Cập nhật hồ sơ
export const updateProfile = async (id: string, updatedData: Partial<Profile>): Promise<Profile> => {
    try {
        const response = await axios.put<Profile>(`${BASE_URL}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error(`Error updating profile with ID ${id}:`, error);
        throw error;
    }
};