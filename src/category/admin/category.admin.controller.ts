import { Body, Controller, Get, Param, Post, Render, Res } from "@nestjs/common";
import { CategoryService } from "../category.service";
import { Prisma } from "@prisma/client";
import { Response } from "express";

@Controller('category')
export class CategoryAdminController {
    constructor(private categoryService: CategoryService) {}

    @Get()
    @Render('admin/category')
    async get_category(){

        const categories = await this.categoryService.get_all_category();
        return {
            title: 'Kategoriler',
            categories: categories
        }
    }

    @Post()
    async post_category(@Body() data: Prisma.CategoryCreateInput, @Res() res:Response){
        await this.categoryService.add_category(data);
        res.redirect(302, '/dashboard/category')
    }

    @Get('delete/:id')
    async delete_category(@Param('id') id:number, @Res() res:Response):Promise<void>{
        await this.categoryService.delete_category(id);
        res.redirect(302, '/dashboard/category')
    }

    @Post('update/:id')
    async update_category(@Param('id') id:number, @Res() res:Response, @Body() data:Prisma.CategoryUpdateInput):Promise<void>{
        await this.categoryService.update_category(data, id);
        res.redirect(302, '/dashboard/category')
    }
}