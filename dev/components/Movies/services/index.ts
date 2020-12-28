import { MovieModel } from "./../model";
class MovieRepository {
  model: any
  constructor(model: any) {
    this.model = model
  }

  public async create(data: any) {
    return new Promise(async (resolve, reject) => {
      if (data) {
        await this.model
          .create(data)
          .then((response: any) => {
            if (response) resolve(response);
          })
          .catch((error: any) => {
            //console.log(error);

            reject(error);
          });
      }
    });
  }

  public async findOne(query: any) {
    return new Promise(async (resolve, reject) => {
      if (query) {
        await this.model
          .findOne(query)
          .then((response: any) => {
            if (!response) return resolve(false);
            if (response) return resolve(response);
          })
          .catch((error: any) => {
            reject(error);
          });
      }
    });
  }

  public async update(_id: string, query: any) {
    return new Promise(async (resolve, reject) => {
      if (query) {
        await this.model
          .findOneAndUpdate({ _id }, query, { new: true })
          .then((result: any) => {
            if (!result) return reject("Update failed");
            resolve(result);
          })
          .catch((error: any) => {
            reject(error);
          });
      }
    });
  }

  public async get(query: any) {
    return new Promise(async (resolve, reject) => {
      if (query) {
        await this.model
          .find(query)
          .then((response: any) => {
            if (!response) return reject("No record found");
            if (response) resolve(response);
          })
          .catch((error: any) => {
            reject(error);
          });
      }
    });
  }

  public async getDetails(query: any) {
    return new Promise(async (resolve, reject) => {
      if (query) {
        return await this.model
          .findOne(query)
          .then((response: any) => {
            if (!response) return reject("No record found");
            response.password = null;
            if (response) resolve(response);
          })
          .catch((error: any) => {
            reject(error);
          });
      }
    });
  }
}

export default new MovieRepository(MovieModel);
