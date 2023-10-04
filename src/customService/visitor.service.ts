import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Injectable()
export class VisitorService {
    constructor(private prisma: PrismaService) {
        this.incremenetVisitorCount()
    }

    async incremenetVisitorCount():Promise<void>{
    
        try{
            await this.prisma.visitor.upsert(
                {
                    where: {
                        id: 1
                    },
                    update: {
                        visit:{
                            increment: 1
                        }
                    },
                    create: {
                        id: 1,
                        visit: 1
                    }
                }
            )
        }catch(err){
            throw new HttpException(err, HttpStatus.BAD_REQUEST)
        }
    }

    async getAllVisit(){
        try{
            const visitors = await this.prisma.visitor.findMany(
                {
                    where:{
                        id: 1
                    }
                }
            )

            return visitors
        }catch(err){
            throw new HttpException(err, HttpStatus.BAD_REQUEST)
        }
    }
}