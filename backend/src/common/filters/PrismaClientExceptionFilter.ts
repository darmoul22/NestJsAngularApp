import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { toGmtTimestamp } from '../utils/date.util'
import { Response } from 'express'
import { StatusCodes } from '../constants/status-codes'

@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(_exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const gmtTimestamp = toGmtTimestamp()
    const status = HttpStatus.INTERNAL_SERVER_ERROR

    response.status(status).json({
      status: StatusCodes[status],
      message: 'Something went wrong. Please try again later.',
      timestamp: gmtTimestamp,
      path: request.url,
    })
  }
}
