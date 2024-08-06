import axios from 'axios';

export const getComments = async (listingId: string) => {
  try {
    const response = await axios.get(`/api/comments/${listingId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};
