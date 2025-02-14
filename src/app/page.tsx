import Container from "@/components/Container";
import HomePage from "@/components/HomePage";
import TopFilm from "@/components/TopFilm";

export default function Home() {
  return (
    <>
      <div className="my-4 md:block hidden">
        <TopFilm />
      </div>
      <Container>
        <HomePage />
      </Container>
    </>
  );
}
