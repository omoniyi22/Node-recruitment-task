import MovieRepo from "./";
import { Movie } from "./../type";
class CreateMovie {
  async execute(movie: Movie) {
    try {
      await MovieRepo.create(movie);
      return movie;
    } catch (error) {
      throw error;
    }
  }
}

export default new CreateMovie();
