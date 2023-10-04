import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { LanguageService } from "src/language/language.service";

@Module({
    controllers: [CategoryController],
    providers: [CategoryService, LanguageService]
})
export class CategoryModule {}