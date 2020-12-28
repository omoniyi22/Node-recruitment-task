"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieModel = void 0;
const mongoose = __importStar(require("mongoose"));
const Schema = mongoose.Schema;
const MoviesSchema = new Schema({
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
}, {
    timestamps: true,
});
MoviesSchema.index({ "$**": "text" }); // to index all string field
exports.MovieModel = mongoose.model("movies", MoviesSchema);
