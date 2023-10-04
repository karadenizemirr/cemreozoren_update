import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import * as secureSession from 'fastify-secure-session'

@Injectable()
export class LoginInterceptors implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        
        const response = context.switchToHttp().getResponse()
        const request = context.switchToHttp().getRequest()
        const session = request.session as secureSession
        const req_url = request.url

        let isLogin = false
        let dashboardLayout = false
        
        if (session && session['token']){
            isLogin = true
        }

        if (req_url.includes('dashboard')){
            dashboardLayout = true
        }

        response.locals.isLogin = isLogin
        response.locals.dashboardLayout = dashboardLayout
        return next.handle()
    }
}