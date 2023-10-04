import { Body, Controller, Get, Post, Render, Res, Session } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { UserService } from "./user.service";
import * as secureSession from '@fastify/secure-session'
import { Response } from "express";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('register')
    async post_register(@Body() data:Prisma.UserCreateInput): Promise<void>{
        await this.userService.register(data)
    }

    @Get('login')
    @Render('login')
    async get_login(){
        return {
            title: 'Giriş Yap'
        }
    }

    @Post('login')
    async post_login(@Body() data:any, @Session() session:secureSession.Session, @Res() res:Response){
        const token = await this.userService.login(data)
        if (token){
            session.set('token', token)
            res.redirect(302, '/dashboard')
        }

        res.redirect(302, '/user/login')
    }
}