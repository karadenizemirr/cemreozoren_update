import { Module } from "@nestjs/common";
import { ProductAdminController } from "./product.admin.controller";
import { ProductService } from "../product.service";

@Module({
    controllers:[ProductAdminController],
    providers: [ProductService]
})
export class ProductAdminModule {}