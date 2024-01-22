import axios from "@/utils/Axios";

const locationApi = {
  setCustomLocation: async ({
    location,
  }: {
    location: string;
  }): Promise<void> => {
    const response = await axios.post("/v3/location/custom", {
      location,
    });
  },
};

export default locationApi;
