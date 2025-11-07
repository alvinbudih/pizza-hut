import { sign } from "jsonwebtoken";

type Payload = {
  id: string;
  name: string;
  email: string;
};

const secret = process.env.JWT_TOKEN!;

export default function signToken(payload: Payload) {
  return sign(payload, secret, { expiresIn: "1d" });
}
