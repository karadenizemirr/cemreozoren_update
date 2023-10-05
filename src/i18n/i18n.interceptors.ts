import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import * as secureSession from 'fastify-secure-session'
import { I18nService } from "nestjs-i18n";


@Injectable()
export class I18nInterceptors implements NestInterceptor {
    constructor(private i18nService: I18nService) { }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const response = context.switchToHttp().getResponse()
        const request = context.switchToHttp().getRequest()
        const session = request.session as secureSession

        let lang:string = 'tr'

        if (session && session['lang']){
            lang = session['lang']
        }
        
        response.locals.lang = lang

        
        response.locals._ = this.i18nService.translate('event', { lang: lang })
        return next.handle()
    }
}