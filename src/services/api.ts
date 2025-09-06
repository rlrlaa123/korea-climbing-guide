import { serverUrl } from '../utils/supabase/client';
import { publicAnonKey } from '../utils/supabase/info';
import { Review, Country } from '../types';

const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${serverUrl}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }

  return response.json();
};

export const reviewsApi = {
  // Get all reviews for a gym
  getReviews: async (gymId: string): Promise<Review[]> => {
    const data = await apiCall(`/gyms/${gymId}/reviews`);
    return data.reviews || [];
  },

  // Create a new review
  createReview: async (gymId: string, reviewData: {
    nickname: string;
    country: Country;
    rating: number;
    text: string;
    images?: string[];
  }): Promise<Review> => {
    const data = await apiCall(`/gyms/${gymId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
    return data.review;
  },

  // Like a review
  likeReview: async (reviewId: string, gymId: string): Promise<Review> => {
    const data = await apiCall(`/reviews/${reviewId}/like`, {
      method: 'POST',
      body: JSON.stringify({ gymId }),
    });
    return data.review;
  },
};

export const savedGymsApi = {
  // Get saved gym IDs for a device
  getSavedGyms: async (deviceId: string): Promise<string[]> => {
    const data = await apiCall(`/saved-gyms/${deviceId}`);
    return data.savedGymIds || [];
  },

  // Save or unsave a gym
  toggleSaveGym: async (deviceId: string, gymId: string, action: 'save' | 'unsave'): Promise<string[]> => {
    const data = await apiCall(`/saved-gyms/${deviceId}`, {
      method: 'POST',
      body: JSON.stringify({ gymId, action }),
    });
    return data.savedGymIds || [];
  },
};

export const statsApi = {
  // Get gym statistics
  getGymStats: async (gymId: string) => {
    const data = await apiCall(`/gyms/${gymId}/stats`);
    return data.stats;
  },
};