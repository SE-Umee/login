export const API = "https://f667-203-135-47-73.eu.ngrok.io";
export const PHOTO_BASE_URL =
  "https://profile-images-barberone-s3.s3.amazonaws.com";
export const BUSINESS_PHOTO_BASE_URL =
  "https://business-logos-barberone-s3.s3.amazonaws.com";

export const getHeaders = async (accessToken) => {
  return {
    headers: {
      authorization: `bearer ${accessToken}`,
    },
  };
};
