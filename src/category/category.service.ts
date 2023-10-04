import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/customService/prisma.service";

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async add_category(data:any){
        try{
            return await this.prisma.category.create(
                {
                    data:{
                        ...data
                    }
                }
            )
        }catch(err){
            throw new HttpException('Category add error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async get_all_category(){
        try{
            return await this.prisma.category.findMany();
        }catch(err){
            throw new HttpException('Category get error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async delete_category(id:number){
        try{
            return await this.prisma.category.delete({
                where:{
                    id:Number(id)
                }
            })
        }catch(err){
            console.log(err)
            throw new HttpException('Category delete error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async update_category(data:any, id:number){
        try{
            return await this.prisma.category.update({
                where: {
                    id: Number(id)
                },
                data: {
                  ...data
                }
            })
        }catch(err){
            throw new HttpException('Category update error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async category_with_product(){
        try{
            return await this.prisma.category.findMany(
                {
                    include:{
                        products: {
                            include: {
                                description: true
                            }
                        }
                    }
                }
            )
        }catch(err){
            throw new HttpException('Get category error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}