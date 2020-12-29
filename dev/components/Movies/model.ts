import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
const MoviesSchema = new Schema(
  {
    userId: {
      type: Number,
      required: [true, "User ID is required"],
      trim: true
    },
    title: {
      type: String,
      required: [true, "Movie title is required"],
      trim: true
    },
    genre: {
      type: String,
      required: [true, "Movie genre is required"],
      trim: true
    },
    release_date: {
      type: String,
      required: [true, "Movie release date is required"],
      trim: true
    },
    month_added: {
      type: Number,
      required: [true, "Month Created is required"],
      trim: true
    },
    director: {
      type: String,
      required: [true, "Movie directory is required"],
      trim: true
    },
  },

  {
    timestamps: true,
  }
);

MoviesSchema.index({ "$**": "text" }); // to index all string field
export const MovieModel = mongoose.model("movies", MoviesSchema);
