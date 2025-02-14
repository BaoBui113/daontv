"use client";
import { getMovies } from "@/services/movies";
import { IMovies } from "@/types";
import { useEffect, useState } from "react";
import CategoryFilmItem from "../CategoryFilmItem";
import CollectionFilm from "../CollectionFilm";
interface MoviesByCategory {
  [key: number]: IMovies[];
}
export default function HomePage() {
  const [listMovieByCategory, setListMovieByCategory] = useState<
    Record<string, IMovies[]>
  >({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await getMovies([1, 2, 3, 4, 5, 6, 7]);
        setListMovieByCategory(
          movies.reduce((acc: MoviesByCategory, item: IMovies) => {
            if (!acc[item.cate_id]) {
              acc[item.cate_id] = [];
            }
            acc[item.cate_id].push(item);
            return acc;
          }, {})
        );
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <CollectionFilm mainTitle="공지사항">
        {Object.entries(listMovieByCategory).map(
          ([key, movies]: [string, IMovies[]]) => {
            return (
              <div key={key} className="relative">
                <CategoryFilmItem
                  slidesPerView={5.2}
                  categories={movies[0].categories[0]}
                  title={movies[0].categories[0].name}
                  listFilmCategories={movies as IMovies[]}
                />
              </div>
            );
          }
        )}
      </CollectionFilm>
    </div>
  );
}
