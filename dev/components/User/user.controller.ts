import Response from "./../../handlers/Response";
import Status from "./../../handlers/Status";
import AuthService from './auth.service'

import config from './../../config'

const responses = new Response();

interface User {
  login(): any;
}

class UserController {
  constructor() {
    this.login = this.login.bind(this);
  }

  public async login(req: any, res: Express.Response) {
    const username = req.body.username;
    const password = req.body.password;
    let { authFactory } = AuthService


    try {
      let token = await authFactory(config.JWT_SECRET)(username, password)
      responses.SuccessResponse(
        res,
        Status.OK.code,
        Status.OK.message,
        { token }
      );
    } catch (error) {
      responses.ErrorResponse(
        res,
        Status.FORBIDDEN,
        Status.SERVER_ERROR.message,
        error
      );
    }

  }
}
const userController = new UserController();
export default userController;