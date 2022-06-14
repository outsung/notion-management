import { LoginDTO } from "../dtos/auth.dto";

export function login(body: LoginDTO) {
  return { email: body.email };
}
