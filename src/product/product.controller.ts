import { Controller, Get, Param, Render } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get('/:id')
    @Render('detail')
    async get_detail(@Param('id') id:string){
        const product = await this.productService.get_product(id)
        return {
            title: 'Ürün Detay',
            product: product[0]
        }
    }
}