export const decodeToken = (token: string) => {
  try {
    const decodedToken = atob(token.split(".")[1]);
    return JSON.parse(decodedToken);
  } catch (error) {
    console.error("Decode token failed", error);
    return null;
  }
};
