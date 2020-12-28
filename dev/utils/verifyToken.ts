import * as jwt from "jsonwebtoken";
const env = require("dotenv");

env.config();

const verifyUserToken = (req: any, res: any, next: any) => {
  //console.log({ s: req.body.search })
  let token = req.headers.authorization.split("Bearer ")[1];
  if (!token) {
    return res
      .status(401)
      .send({ auth: false, error: `Authentication error. Token required.` });
  }

  try {
    token = token.toString();
  } catch (err) {
    return res.status(401).send({ auth: false, error: "Invalid token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err: any, decoded: any) {
    if (err) {
      return res
        .status(401)
        .send({ auth: false, err, message: "Failed to authenticate token." });
    } else {
      //console.log({ decoded })
      req.user = decoded
    }
    // if everything good, save to request for use in other routes
    const user = {};
    next();
  });
};

export default verifyUserToken;
