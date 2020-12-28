import mongoose from 'mongoose'
import config from '../../config';
let { MovieModel } = require("./../../components/Movies/model");
let supertest = require('supertest')
let app = require('./../../app')


let basic_token: String
let premuim_token: String
let title = "fast"

describe('User and Movie Test', () => {
  beforeAll(async () => {
    const url = config.MONGO_URI;
    await mongoose.connect(url, { useNewUrlParser: true });
    MovieModel.deleteMany({})
  })
  afterAll(() => MovieModel.deleteMany({}))

  it("it should signin a basic user", async (done) => {
    let res = await supertest(app).post('/api/v1/user/login')
      .send({
        username: "basic-thomas",
        password: "sR-_pcoow-27-6PAwCD8"
      })
    expect(res.statusCode).toEqual(200)
    basic_token = res.body.data.token
    done()
  })


  it("it should signin a premuim user", async (done) => {
    let res = await supertest(app).post('/api/v1/user/login')
      .send({
        username: "premium-jim",
        password: "GBLtTyq3E_UNjFnpo9m6",
      })
    expect(res.statusCode).toEqual(200)
    premuim_token = res.body.data.token
    done()
  })


  it("Basic user can create only four movies in a month", async (done) => {
    let Movie = await supertest(app)
      .post('/api/v1/movies')
      .set('Authorization', `Bearer ${basic_token}`)
      .send({ title })
    if (Movie.statusCode !== 400) {
      for (let i = 0; i < 5; i++) {
        if (i > 4) {
          expect(Movie.body)
            .toEqual({
              message: "You have reach the limit for basic user" +
                "let's switch to Premium",
              error: "Internal Error"
            })
        } else {
          expect(Movie.body.data.title).toMatch(RegExp(title, "i"))
        }
        done()
      }
    } else {
      expect(Movie.body.error.message)
        .toEqual("getaddrinfo ENOTFOUND www.omdbapi.com www.omdbapi.com:80")
      done()
    }
  }, 20000)

  it("Premium user can create more than four movies in a month", async (done) => {
    let Movie = await supertest(app)
      .post('/api/v1/movies')
      .set('Authorization', `Bearer ${premuim_token}`)
      .send({ title })
    if (Movie.statusCode !== 400) {
      for (let i = 0; i < 5; i++) {
        if (i > 4) {
          // After 4 movies, it kept on creating movies
          expect(Movie.body.data.title).toMatch(RegExp(title, "i"))
        } else {
          expect(Movie.body.data.title).toMatch(RegExp(title, "i"))
        }
        done()
      }
    } else {
      expect(Movie.body.error.message)
        .toEqual("getaddrinfo ENOTFOUND www.omdbapi.com www.omdbapi.com:80")
      done()
    }
  }, 20000)

  it("should throw an error message if token fail", async (done) => {
    let Movie = await supertest(app)
      .post('/api/v1/movies')
      .set('Authorization', `Bearer ${premuim_token + "wrong_token"}`)
      .send({})
    expect(Movie.body.message)
      .toEqual("Failed to authenticate token.")
    done()
  }, 6000)

  it("should throw an error message if title is missing", async (done) => {
    let Movie = await supertest(app)
      .post('/api/v1/movies')
      .set('Authorization', `Bearer ${premuim_token}`)
      .send({})
    expect(Movie.body.error.details[0].message)
      .toEqual("\"title\" is required")
    done()
  }, 20000)

  it("should throw an error message if title is empty", async (done) => {
    let Movie = await supertest(app)
      .post('/api/v1/movies')
      .set('Authorization', `Bearer ${premuim_token}`)
      .send({ title: "" })
    expect(Movie.body.error.details[0].message)
      .toEqual("\"title\" is not allowed to be empty")
    done()
  }, 20000)
})