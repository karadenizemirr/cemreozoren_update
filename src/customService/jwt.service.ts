import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jwt from 'jsonwebtoken'

@Injectable()
export class JwtService {
    constructor(private configService: ConfigService) {}

    sign(payload:any){
        return jwt.sign(payload, this.configService.get<string>('SECRET_KEY'), {expiresIn: '1h'})
    }

    verify(token:string){
        return jwt.verify(token, this.configService.get<string>('SECRET_KEY'))
    }

}