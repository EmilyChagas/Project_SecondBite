import axios from 'axios';
import { CustomError } from '../utils/CustomError';

export const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
  try {
    const { data } = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
    );

    const addr = data.address;
    if (!addr) return data.display_name;

    const street = addr.road || addr.pedestrian || '';
    const neighborhood = addr.suburb || addr.neighbourhood || '';
    const city = addr.city || addr.town || addr.village || '';

    const parts = [street, neighborhood, city].filter(Boolean);
    return parts.join(', ') || data.display_name;
  } catch (error) {
    if (axios.isAxiosError(error)) throw new CustomError(error.response?.data.message, error.response?.status);
  }
};
