import { StatusCodes } from "./httpStatus.enum";

export const ErrorCodes = {
  COMMON_ERROR: {
    message: "처리 중 오류가 발생했습니다.",
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  UNDEFINED_ERROR: {
    message: "알 수 없는 오류가 발생하였습니다.",
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  INVALID_TOKEN: {
    message: "보안 토큰이 잘못되었습니다.",
    status: StatusCodes.UNAUTHORIZED,
  },
  NOT_FOUND_TOKEN: {
    message: "보안 토큰을 찾을 수 없습니다.",
    status: StatusCodes.NOT_FOUND,
  },
  NOT_FOUND_GOOGLE_TOKEN: {
    message: "구글 보안 토큰을 찾을 수 없습니다.",
    status: StatusCodes.NOT_FOUND,
  },
  EXPIRED_TOKEN: {
    message: "만료되었습니다. 다시 시도해주세요",
    status: StatusCodes.REQUEST_TIMEOUT,
  },
  NOT_FOUND_DATA: {
    message: "데이터를 가져오는 중 에러가 발생했습니다.",
    status: StatusCodes.NOT_FOUND,
  },
  UNAUTHORIZED_USER: {
    message: "아직 검증이되지 않은 아이디입니다.",
    status: StatusCodes.UNAUTHORIZED,
  },
  INVALID_INPUT: {
    message: "전달된 파라미터 중 잘못된 항목이있습니다.",
    status: StatusCodes.BAD_REQUEST,
  },
  INVALID_INPUT_AMOUNT: {
    message: "유효하지 않는 결제 금액이 포함되어 있습니다.",
    status: StatusCodes.BAD_REQUEST,
  },
  INVALID_INVITE_EMAIL: {
    message: "유효하지 않는 이메일 주소가 포함되어 있습니다.",
    status: StatusCodes.BAD_REQUEST,
  },
  INVALID_USER_VERIFYCODE: {
    message: "유효하지 않는 유저 인증코드가 포함되어 있습니다.",
    status: StatusCodes.BAD_REQUEST,
  },
  INVALID_USER: {
    message: "유효하지 않은 회원입니다.",
    status: StatusCodes.BAD_REQUEST,
  },
  INVALID_REQUEST: {
    message: "유효하지 않은 요청입니다.",
    status: StatusCodes.BAD_REQUEST,
  },
  NOT_UNIQUE_USER: {
    message: "이미 가입된 이름입니다.",
    status: StatusCodes.BAD_REQUEST,
  },
  NOT_UNIQUE_HOST: {
    message: "이미 등록된 호스트 이름입니다.",
    status: StatusCodes.BAD_REQUEST,
  },
  CANNOT_ISSUE_CUSTOMERUID: {
    message: "카드 인증을 하는데 실패했습니다.",
    status: StatusCodes.SERVICE_UNAVAILABLE,
  },
  CANNOT_CARD_PAYMENT_FAILED: {
    message: "카드 승인에 실패했습니다.",
    status: StatusCodes.SERVICE_UNAVAILABLE,
  },
  CANNOT_CARD_PAYMENT_REQUEST_FAILED: {
    message: "카드사 요청에 실패했습니다.",
    status: StatusCodes.SERVICE_UNAVAILABLE,
  },
  NOT_FOUND_CUSTOMERUID: {
    message: "등록된 결제 키가 없습니다.",
    status: StatusCodes.NOT_FOUND,
  },
  NOT_FOUND_USER: {
    message: "등록된 유저를 찾을 수 없습니다.",
    status: StatusCodes.NOT_FOUND,
  },
  NOT_FOUND_ORDER: {
    message: "등록된 주문정보를 찾을 수 없습니다.",
    status: StatusCodes.NOT_FOUND,
  },
  NOT_FOUND_PAYMENT: {
    message: "등록된 결제정보를 찾을 수 없습니다.",
    status: StatusCodes.NOT_FOUND,
  },
  NOT_FOUND_USER_VERIFYCODE: {
    message: "등록된 유저 인증코드를 찾을 수 없습니다.",
    status: StatusCodes.NOT_FOUND,
  },
  NOT_FOUND_USERLISENSE: {
    message: "등록된 사용권 정보를 찾을 수 없습니다.",
    status: StatusCodes.NOT_FOUND,
  },
  NOT_FOUND_SENDMAILLIST: {
    message: "등록된 발송 리스트를 찾을 수 없습니다.",
    status: StatusCodes.NOT_FOUND,
  },
  INVALID_EMAIL: {
    message: "가입되지 않은 이메일 입니다.",
    status: StatusCodes.BAD_REQUEST,
  },
  INVALID_HOST: {
    message: "가입되지 않은 호스트 입니다.",
    status: StatusCodes.BAD_REQUEST,
  },
  DETECTED_FORGED_PAYMENTS: {
    message: "위조된 결제시도가 감지 되었습니다.",
    status: StatusCodes.FORBIDDEN,
  },
  ALREADY_VERIFIED: {
    message: "이미 검증된 아이디입니다.",
    status: StatusCodes.CONFLICT,
  },
  INVALID_EMAIL_PASSWORD: {
    message: "아이디 혹은 패스워드가 틀렸습니다.",
    status: StatusCodes.BAD_REQUEST,
  },
  ALREADY_PRODUCT_NAME: {
    message: "기존 등록된 상품입니다.",
    status: StatusCodes.CONFLICT,
  },
  ALREADY_PAYMENT_CARD: {
    message: "기존 등록된 카드정보입니다.",
    status: StatusCodes.CONFLICT,
  },
  USER_VALIDATION: {
    message: "유저 인증에 실패했습니다.",
    status: StatusCodes.BAD_REQUEST,
  },
};
