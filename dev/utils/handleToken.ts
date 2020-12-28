import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export default class HandleToken {
  constructor() { }

  public async generateToken(userId: string, name: string, role: string) {
    const holder = {
      userId,
      name,
      role
    };

    return new Promise((resolve, reject) => {
      jwt.sign(
        holder,
        process.env.JWT_SECRET,
        {
          expiresIn: 86400, //24 hrs
          issuer: "https://www.netguru.com/",
          subject: "123"
        },
        (error: any, token: any) => {
          if (error) return reject(error);

          const _response = {
            auth: true,
            token
          };
          resolve(_response);
        }
      );
    });
  }

  public async decodeToken(token: any) {
    return new Promise((resolve, reject) => {

      try {
        token = token.toString();
      } catch (error) {
        return reject({
          auth: false,
          message: "Invalid token"
        });
      }

      jwt.verify(token, process.env.JWT_SECRET, (error: any, decoded: any) => {
        if (error) {
          return reject({
            auth: false,
            error,
            message: "Failed to authenticate token"
          });
        }
        //console.log({ decoded })
        return resolve(decoded);
      });
    });
  }
}
