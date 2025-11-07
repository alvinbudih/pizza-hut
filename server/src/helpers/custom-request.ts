import { Request } from "express";

export type PayloadToken = {
  id: string;
  name: string;
  email: string;
};

export default interface CustomRequest extends Request {
  user: PayloadToken;
}
