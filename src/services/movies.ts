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

export const getMovieCategories = async ({
  search = "",
  page = 1,
  limit = 24,
  categoryId,
}: {
  search?: string;
  page?: number;
  limit?: number;
  categoryId: number;
}) => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      categoryId: String(categoryId),
    });
    if (search) {
      params.append("search", search);
    }
    const res = await fetchData(`/movies/?${params.toString()}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getMovieDetail = async (id: string) => {
  try {
    const movie = await fetchData(`/movies/${id}`);
    return movie.data;
  } catch (error) {
    throw error;
  }
};
