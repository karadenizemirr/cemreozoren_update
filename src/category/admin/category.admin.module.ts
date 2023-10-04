import { Module } from "@nestjs/common";
import { CategoryAdminController } from "./category.admin.controller";
import { CategoryService } from "../category.service";
import { LanguageService } from "src/language/language.service";

@Module({
    controllers: [CategoryAdminController],
    providers: [CategoryService,LanguageService]
})
export class CategoryAdminModule {}