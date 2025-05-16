import axiosInstance from '../Config/Axios';

// Types
export interface RegisterUserData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  avatar?: File;
  coverImage?: File;
}

export interface LoginUserData {
  email?: string;
  username?: string;
  password: string;
}

export interface UpdateUserData {
  fullName?: string;
  email?: string;
  username?: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

// User Service
class UserService {
  /**
   * Register a new user
   * @param userData User registration data including files
   * @returns Promise with user data
   */
  async registerUser(userData: RegisterUserData) {
    const formData = new FormData();
    
    // Add text fields
    formData.append('fullName', userData.fullName);
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    
    // Add files if provided
    if (userData.avatar) {
      formData.append('avatar', userData.avatar);
    }
    
    if (userData.coverImage) {
      formData.append('coverImage', userData.coverImage);
    }
    
    const response = await axiosInstance.post('/users/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }

  /**
   * Login a user
   * @param loginData Login credentials
   * @returns Promise with logged in user data
   */
  async loginUser(loginData: LoginUserData) {
    const response = await axiosInstance.post('/users/login', loginData);
    return response.data;
  }

  /**
   * Logout the current user
   * @returns Promise with logout status
   */
  async logoutUser() {
    const response = await axiosInstance.post('/users/logout');
    return response.data;
  }

  /**
   * Refresh the access token using refresh token
   * @returns Promise with new tokens
   */
  async refreshToken() {
    const response = await axiosInstance.post('/users/refresh-token');
    return response.data;
  }

  /**
   * Change the current user's password
   * @param passwordData Old and new password
   * @returns Promise with status
   */
  async changePassword(passwordData: ChangePasswordData) {
    const response = await axiosInstance.patch('/users/change-password', passwordData);
    return response.data;
  }

  /**
   * Get the current logged-in user's profile
   * @returns Promise with user data
   */
  async getCurrentUser() {
    const response = await axiosInstance.get('/users/me');
    return response.data;
  }

  /**
   * Update the current user's account information
   * @param userData User data to update
   * @returns Promise with updated user data
   */
  async updateUserAccount(userData: UpdateUserData) {
    const response = await axiosInstance.patch('/users/update', userData);
    return response.data;
  }

  /**
   * Update the current user's avatar
   * @param avatar Avatar image file
   * @returns Promise with updated user data
   */
  async updateAvatar(avatar: File) {
    const formData = new FormData();
    formData.append('avatar', avatar);
    
    const response = await axiosInstance.patch('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }

  /**
   * Update the current user's cover image
   * @param coverImage Cover image file
   * @returns Promise with updated user data
   */
  async updateCoverImage(coverImage: File) {
    const formData = new FormData();
    formData.append('coverImage', coverImage);
    
    const response = await axiosInstance.patch('/users/cover-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }

  /**
   * Get a channel profile by username
   * @param username The username of the channel
   * @returns Promise with channel data
   */
  async getChannelProfile(username: string) {
    const response = await axiosInstance.get(`/users/channel/${username}`);
    return response.data;
  }

  /**
   * Get the current user's watch history
   * @returns Promise with watch history
   */
  async getUserWatchHistory() {
    const response = await axiosInstance.get('/users/watch-history');
    return response.data;
  }
}

export default new UserService();