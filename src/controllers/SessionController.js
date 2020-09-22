import User from "../models/User";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";

class SessionController {
  async auth(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw { message: "Não existe usuário com esse endereço de email" };
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash
      );

      if (isPasswordValid) {
        const jwt_token = generateToken(user);
        return res.header('x-auth-token', jwt_token).json({ message: "Autenticado" });
      } else {
        throw { message: "Verfique suas credenciais" };
      }
    } catch (err) {
      return res.status(400).json({ message: err.message || err });
    }
  }
}

export default new SessionController();
