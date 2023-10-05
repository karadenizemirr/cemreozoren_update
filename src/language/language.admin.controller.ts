import { Body, Controller, Get, Param, Post, Render, Res } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { LanguageService } from "./language.service";
import { Response } from "express";

@Controller('language')
export class LanguageAdminController {
    constructor(private languageService: LanguageService) { }

    @Get()
    @Render('admin/language')
    async get_language(){
        const language = await this.languageService.get_all_language()
        return {
            title: 'Diller',
            language: language
        }
    }

    @Post()
    async post_language(@Body() data:Prisma.LanguageCreateInput, @Res() res:Response){
        await this.languageService.create_language(data)
        res.redirect(302, '/dashboard/language')
    }

    @Post('update/:id')
    async post_update_language(@Body() data:Prisma.LanguageUpdateInput, @Res() res:Response, @Param('id') id:number){
        await this.languageService.language_update(data,id)
        res.redirect(302, '/dashboard/language')
    }
}