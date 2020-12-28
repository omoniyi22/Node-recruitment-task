import HandleToken from "../../utils/handleToken"
let supertest = require('supertest')
let app = require('./../../app')

let basic_token: String
let premuim_token: String


describe('User Test', () => {
  it("should signin a basic user", async (done) => {
    let res = await supertest(app).post('/api/v1/user/login')
      .send({
        username: "basic-thomas",
        password: "sR-_pcoow-27-6PAwCD8"
      })
    expect(res.statusCode).toEqual(200)
    basic_token = res.body.data.token
    done()
  })

  it("should signin a premuim user", async (done) => {
    let res = await supertest(app).post('/api/v1/user/login')
      .send({
        username: "premium-jim",
        password: "GBLtTyq3E_UNjFnpo9m6",
      })
    expect(res.statusCode).toEqual(200)
    premuim_token = res.body.data.token
    done()
  })

  it("should decode premium token for payload", async (done) => {
    let decoder = new HandleToken().decodeToken
    let decoded: any = await decoder(premuim_token)
    expect(decoded).toEqual({
      userId: 434,
      name: 'Premium Jim',
      role: 'premium',
      iat: decoded.iat,
      exp: decoded.exp,
      iss: 'https://www.netguru.com/',
      sub: '434'
    })
    done()
  })

  it("should decode basic token for payload", async (done) => {
    let decoder = new HandleToken().decodeToken
    let decoded: any = await decoder(basic_token)
    expect(decoded).toEqual({
      userId: 123,
      name: 'Basic Thomas',
      role: 'basic',
      iat: decoded.iat,
      exp: decoded.exp,
      iss: 'https://www.netguru.com/',
      sub: '123'
    })
    done()
  })

  it("should fail if login credentials are wrong", async (done) => {
    let res = await supertest(app).post('/api/v1/user/login')
      .send({
        username: "omoniyi-stephen",
        password: "sR-6PAwCD8"
      })
    expect(res.body.error)
      .toEqual({ "name": "Failed Authentication" })
    done()
  })

  it("should throw error message if password field is empty", async (done) => {
    let res = await supertest(app).post('/api/v1/user/login')
      .send({
        username: "basic-thomas",
        password: ""
      })
    expect(res.body.error.details[0].message)
      .toEqual("\"password\" is not allowed to be empty")
    done()
  })

  it("should throw error message if username field is empty", async (done) => {
    let res = await supertest(app).post('/api/v1/user/login')
      .send({
        username: "",
        password: "sR-_pcoow-27-6PAwCD8"
      })
    expect(res.body.error.details[0].message)
      .toContain("\"username\" is not allowed to be empty")
    done()
  })

  it("should throw error message if password field is missing", async (done) => {
    let res = await supertest(app).post('/api/v1/user/login')
      .send({
        username: "basic-thomas"
      })
    expect(res.body.error.details[0].message)
      .toEqual("\"password\" is required")
    done()
  })

  it("should throw error message if username field is missing", async (done) => {
    let res = await supertest(app).post('/api/v1/user/login')
      .send({
        password: "sR-_pcoow-27-6PAwCD8"
      })
    expect(res.body.error.details[0].message)
      .toContain("\"username\" is required")
    done()
  })
})