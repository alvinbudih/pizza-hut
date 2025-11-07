import { verify } from "jsonwebtoken";

const secret = process.env.JWT_TOKEN!;

export default function verifyToken(token: string) {
  return verify(token, secret);
}
