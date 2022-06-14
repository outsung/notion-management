// import { HttpException as Error } from "@nestjs/common";
import { HttpException as Error } from "@storyofams/next-api-decorators";
import { ErrorCodes } from "../constants";

export class HttpException extends Error {
  constructor(key: keyof typeof ErrorCodes) {
    super(ErrorCodes[key].status, ErrorCodes[key].message);
  }
}
