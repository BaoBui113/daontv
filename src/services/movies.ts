"use server";
import { fetchData } from "@/helper/fetch";

export const getMovies = async (group: number[]) => {
  try {
    const res = await fetchData(
      `/movies/categories?limit=10&categoryGroup=${group.join(",")}`
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};
