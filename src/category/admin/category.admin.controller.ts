import { Body, Controller, Get, Param, Post, Render, Res, UseGuards } from "@nestjs/common";
import { CategoryService } from "../category.service";
import { Prisma } from "@prisma/client";
import { Response } from "express";
import { AuthGuard } from "src/auth/auth.guard";
import { LanguageService } from "src/language/language.service";

@Controller('category')
@UseGuards(AuthGuard)
export class CategoryAdminController {
    constructor(private categoryService: CategoryService, private languageService: LanguageService) { }

    @Get()
    @Render('admin/category')
    async get_category() {

        const categories = await this.categoryService.get_all_category();
        const language = await this.languageService.get_all_language();

        return {
            title: 'Kategoriler',
            categories: categories,
            language: language
        }
    }

    @Post()
    async post_category(@Body() data: Prisma.CategoryCreateInput, @Res() res: Response) {
        await this.categoryService.add_category(data);
        res.redirect(302, '/dashboard/category')
    }

    @Get('delete/:id')
    async delete_category(@Param('id') id: number, @Res() res: Response): Promise<void> {
        await this.categoryService.delete_category(id);
        res.redirect(302, '/dashboard/category')
    }

    @Post('update/:id')
    async update_category(@Param('id') id: number, @Res() res: Response, @Body() data: Prisma.CategoryUpdateInput): Promise<void> {
        await this.categoryService.update_category(data, id);
        res.redirect(302, '/dashboard/category')
    }
}