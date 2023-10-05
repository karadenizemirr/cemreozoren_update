import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/customService/prisma.service";

@Injectable()
export class LanguageService {
    constructor(private prisma: PrismaService) { }

    async create_language(data: any) {
        try {
            await this.prisma.language.create(
                {
                    data: {
                        name: data.name,
                        short: data.short
                    }
                }
            )
            return true
        } catch (err) {
            console.log(err)
            throw new HttpException('Language error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async get_all_language() {
        try {
            const languages = await this.prisma.language.findMany()
            return languages
        } catch (err) {
            throw new HttpException('Language error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async get_delete_language(id:number):Promise<void>{
        try{
            await this.prisma.language.deleteMany(
                {
                    where: {
                        id: id
                    }
                }
            )
        }catch(err){
            console.log(err)
            throw new HttpException('Language error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}