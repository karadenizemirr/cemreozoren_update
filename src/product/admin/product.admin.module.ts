import { Module } from "@nestjs/common";
import { ProductAdminController } from "./product.admin.controller";
import { ProductService } from "../product.service";
import { LanguageService } from "src/language/language.service";

@Module({
    controllers:[ProductAdminController],
    providers: [ProductService,LanguageService]
})
export class ProductAdminModule {}