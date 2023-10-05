import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { PrismaService } from "src/customService/prisma.service";

@Injectable()
export class CategoryService {
    constructor(
        private prisma: PrismaService
        ) {}

    async add_category(data:any){
        try{
            return await this.prisma.category.create(
                {
                    data:{
                        name: data.name,
                        language:{
                            connect: {
                                id: Number(data.language)
                            }
                        }
                    }
                }
            )
        }catch(err){
            console.log(err)
            throw new HttpException('Category add error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async get_all_category(){
        try{
            return await this.prisma.category.findMany(
                {
                    include:{
                        language: true
                    }
                }
            );
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
                    name: data.name,
                    language: {
                        connect: {
                            id: Number(data.language)
                        }
                    }
                },
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
                                description: true,
                                location: true,
                                language: true
                            }
                        },
                        language: true
                    }
                }
            )
        }catch(err){
            throw new HttpException('Get category error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async category_with_id_product(id:number){
        try{
            return await this.prisma.category.findMany({
                where: {
                    id: Number(id)
                },
                include: {
                    products: {
                        include: {
                            description: true,
                            location: true,
                            language: true,
                            detail: true,
                            media: {
                                include: {
                                    images: true
                                }
                            }
                        }
                    }
                }
            })
        }catch(err){
            throw new HttpException('Get category error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}