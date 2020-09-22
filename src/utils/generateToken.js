import jwt from "jsonwebtoken";

export default function generateToken({ _id, name, email }) {
  const token = jwt.sign({ id, name, email }, process.env.PRIVATE_KEY);
  return token;
}
