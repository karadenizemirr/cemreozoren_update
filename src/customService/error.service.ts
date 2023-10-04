import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";

@Catch()
export class ErrorService implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse();

        let statusCode = 500
        let message = "Internal Server Error"

        if (exception.response) {
            statusCode = exception.response.statusCode
            message = exception.response.message
        }

        if (statusCode === 300) {
            response.redirect(302, '/')
        }

        if (statusCode === 404) {
            response.redirect(302, '404')
        }

        if (statusCode) {
            response.redirect(302, '/')
        }
    }
}