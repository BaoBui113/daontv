"use server";

import { fetchData } from "@/helper/fetch";

export const loginService = async (data: {
  username: string;
  password: string;
}) => {
  const { username, password } = data;
  try {
    const res = await fetchData(
      `/auth/login`,
      "POST",
      {},
      { username, password }
    );

    return res;
  } catch (error) {
    throw error;
  }
};
