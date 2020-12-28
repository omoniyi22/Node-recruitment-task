import * as bcrypt from "bcryptjs";

interface IHasher {
  hashPassword: Function;
  decryptPassword: Function;
}

const Hasher: IHasher = {
  hashPassword: async (password: string) => {
    if (!password) {
      throw new Error("No password provided");
    }

    const hashedPassword = bcrypt.hashSync(password, 15);

    if (!hashedPassword) return false;

    return hashedPassword;
  },

  decryptPassword: async (clientPassword: string, password: string) => {
    if (!clientPassword) return false;

    const decryptedPassword = bcrypt.compareSync(clientPassword, password);

    if (!decryptedPassword) return false;

    return decryptedPassword;
  }
};

export default Hasher;
