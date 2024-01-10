import Cookies from "js-cookie";

export const dkss = "dkss";
export const dker = "dker";
export const userEmail = "userEmail";
export const userToken = "userToken";

export const getToken = () => {
  return Cookies.get("userToken") as string;
};

export const getUserName = () => {
  return Cookies.get("userEmail") as string;
};
