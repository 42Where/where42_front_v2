import { axios } from '@/lib/Axios';

const locationApi = {
  setCustomLocation: async ({
    location,
  }: {
    location: string;
  }): Promise<void> => {
    const response = await axios.post('/v3/location/custom', {
      customLocation: location,
    });
  },
  deleteCustomLocation: async (): Promise<void> => {
    await axios.delete('/v3/location/custom');
  },
};

export default locationApi;
