import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/customService/prisma.service";
import * as bcrypt from 'bcrypt'
import { Prisma } from "@prisma/client";
import { JwtService } from "src/customService/jwt.service";

@Injectable()
export class UserService {
    constructor(private prisma:PrismaService, private jwtService: JwtService) { }

    async register(data:Prisma.UserCreateInput) {
        try {
            const password = await bcrypt.hash(data.password, 10)
            await this.prisma.user.create(
                {
                    data: {
                        name: data.name,
                        surname: data.surname,
                        email : data.email ,
                        phone: data.email,
                        password: password
                    }
                }
            )
            return true
        } catch (err) {
            console.log(err)
            throw new HttpException('Register error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async login(data:any){
        const control = await this.prisma.user.findUnique(
            {
                where: {
                    email: data.email
                }
            }
        )

        if (!control) return false
        const password_control = await bcrypt.compare(data.password, control.password)
        if (!password_control) return false

        const token = this.jwtService.sign({id: control.id})
        return token
    }
}