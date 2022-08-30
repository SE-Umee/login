export const API = "http://localhost:3000";
export const PHOTO_BASE_URL = "http://localhost:3000";
export const getHeaders = async (accessToken) => {
  return {
    headers: {
      authorization: `bearer ${accessToken}`,
    },
  };
};
