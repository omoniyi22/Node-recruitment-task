import MovieRepo from "./";
import { Movie } from "./../type";
class GetAllMovies {
  async execute(userId: string) {
    try {
      const result: Array<Movie> | any = await MovieRepo.get({ userId });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new GetAllMovies();
