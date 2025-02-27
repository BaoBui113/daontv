"use server";
import { fetchData } from "@/helper/fetch";

export const getCommentService = async (movie_id: string) => {
  try {
    const res = await fetchData(`/comments/${movie_id}`, "GET");

    return res;
  } catch (error) {
    throw error;
  }
};

export const postCommentService = async (
  movie_id: string,
  content: string,
  token: string,
  parent_id?: string
) => {
  try {
    const res = await fetchData(
      `/comments`,
      "POST",
      {},
      {
        movie_id,
        content,
        parent_id,
      },
      token
    );

    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteCommentService = async (
  comment_id: string,
  token: string
) => {
  try {
    const res = await fetchData(
      `/comments/${comment_id}`,
      "DELETE",
      {},
      {},
      token
    );
    return res;
  } catch (error) {
    throw error;
  }
};
