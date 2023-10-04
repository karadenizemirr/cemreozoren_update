import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { CategoryService } from './category/category.service';
import { ProductService } from './product/product.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
    private categoryService: CategoryService,
    private productService:ProductService
    ) {}

  @Get()
  @Render('index')
  async getHello() {
    const category_with_product = await this.categoryService.category_with_product()
    return {
      title: 'Anasayfa',
      category_with_product: category_with_product
    }
  }

  @Get('dashboard')
  @Render('admin/dashboard')
  async get_dashboard(){
    return {
      title:'Dashboard'
    }
  }
}
