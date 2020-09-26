import User from "../models/User";
import generateHash from "../utils/generateHash";
import generateToken from '../utils/generateToken'

class UserController {
  async create(req, res) {
    const { name, password, email } = req.body;
    const password_hash = await generateHash(password);
    try {
      const user = await User.create({
        name,
        password_hash,
        email,
      });
      const token = generateToken(user)
      return res.header('x-auth-token', token).json(user);
    } catch (err) {
      return res.status(400).json({ error: "Não foi possível criar seu usário", err });
    }
  }
}

export default new UserController();
