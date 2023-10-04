import { Module } from "@nestjs/common";
import { CategoryAdminController } from "./category.admin.controller";
import { CategoryService } from "../category.service";

@Module({
    controllers: [CategoryAdminController],
    providers: [CategoryService]
})
export class CategoryAdminModule {}