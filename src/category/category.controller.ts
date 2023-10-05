import { Controller, Get, Param, Render } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Controller('category')
export class CategoryController {
    constructor(private categoryService:CategoryService) {}

    @Get('/:id')
    @Render('category')
    async get_category_product(@Param('id') id:number):Promise<any>{
        const products = await this.categoryService.category_with_id_product(id)

        return {
            title: 'Emlaklar',
            products: products[0].products
        }
    }
}