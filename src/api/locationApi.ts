import { axios } from '@/lib/Axios';
import { SetCustomLocation, DeleteCustomLocation } from '@/types/api/location';

const setCustomLocation: SetCustomLocation = async ({ location }) => {
  await axios.post('/v3/location/custom', {
    customLocation: location,
  });
};

const deleteCustomLocation: DeleteCustomLocation = async () => {
  await axios.delete('/v3/location/custom');
};

export const locationApi = {
  setCustomLocation,
  deleteCustomLocation,
};
