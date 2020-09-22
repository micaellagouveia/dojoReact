import User from "../models/User";
import generateHash from "../utils/generateHash";

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
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: "Não foi possível criar seu usário", err });
    }
  }
}

export default new UserController();
