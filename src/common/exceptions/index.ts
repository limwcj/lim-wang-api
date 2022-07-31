import { HttpException, HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  PARAMS_ERROR = 'PARAMS_ERROR',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
}

export class BaseException extends HttpException {
  constructor(message: string, code: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
    super(JSON.stringify({ message, errorCode: code, status }), status);
  }
}

export class UnauthorizedException extends BaseException {
  constructor() {
    super(`Unauthorized`, ErrorCode.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
  }
}

export class ParamsError extends BaseException {
  constructor(message?: string) {
    super(`Params error${message ? `, ${message}` : ''}`, ErrorCode.PARAMS_ERROR, HttpStatus.BAD_REQUEST);
  }
}

export class PermissionDenied extends BaseException {
  constructor(message?: string) {
    super(`Permission denied${message ? `, ${message}` : ''}`, ErrorCode.PERMISSION_DENIED, HttpStatus.FORBIDDEN);
  }
}
