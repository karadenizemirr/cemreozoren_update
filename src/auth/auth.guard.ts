import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import * as secureSession from 'fastify-secure-session'


@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const response = context.switchToHttp().getResponse()
        const request = context.switchToHttp().getRequest()
        const session = request.session as secureSession

        if (session && session['token']){
            return true
        }

        return false
    }
}