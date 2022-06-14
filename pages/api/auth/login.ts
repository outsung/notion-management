import {
  Body,
  createHandler,
  Post,
  ValidationPipe,
} from "@storyofams/next-api-decorators";
import * as AuthService from "../../../src/services/auth.service";
import { LoginDTO } from "../../../src/dtos/auth.dto";

class AuthHandler {
  @Post()
  async login(@Body(ValidationPipe) body: LoginDTO) {
    return AuthService.login(body);
  }
}

export default createHandler(AuthHandler);

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<User>
// ) {
//   // @Body(ValidationPipe) body: CreateUserDTO
//   @Post()
//   login(@Body(ValidationPipe) body: LoginDTO) {
//     // return await DB.createUser(body);
//   }
//   // if (req.method === "POST") {
//   //   login
//   //   const user = await userService.findUserByEmail(email);
//   //   if (!user) throw new HttpException("NOT_FOUND_USER");
//   //   // Process a POST request
//   // } else {
//   //   // Handle any other HTTP method
//   // }
// }

// res.status(200).json({ name: 'John Doe' })

// function () {
// const { email, code } = req.body;
// const user = await userService.findUserByEmail(email);
// if (!user) throw new HttpException("NOT_FOUND_USER");

// if (user.code !== code) throw new HttpException("NOT_VALID_CODE");

// console.log("login : ", { user });

// const token = utils.getToken(user);

// return res.status(StatusCodes.OK).json({ result: { token: token } });
// }
