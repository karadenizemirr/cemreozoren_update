import { FilesInterceptor, UploadedFiles, MemoryStorageFile } from '@blazity/nest-file-fastify';
import { Body, Controller, Get, Param, Post, Render, Res, UseInterceptors } from "@nestjs/common";
import { CategoryService } from "src/category/category.service";
import { ProductService } from '../product.service';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

@Controller('product')
export class ProductAdminController {
    constructor(private categoryService: CategoryService, private productService: ProductService) {}

    @Get()
    @Render('admin/product/product')
    async get_product(){
        const products = await this.productService.get_all_product();
        return {
            title: 'Emlaklar',
            products: products
        }
    }

    // Add Product Operations
    @Get('add')
    @Render('admin/product/add-product')
    async get_add_product(){
        const categories = await this.categoryService.get_all_category();

        return {
            title: 'Emlak Ekle',
            categories: categories
        }
    }
    @Post('add')
    @UseInterceptors(FilesInterceptor('images', 10, {
        dest: 'src/assets/public/uploads'
    }))
    async post_add_product(@Body() data:any, @UploadedFiles() files:MemoryStorageFile[], @Res() res:Response){
        data.images = files
        await this.productService.create_product(data);
        res.redirect(302, '/dashboard/product')

    }

    @Get('delete/:id')
    async get_delete(@Param('id') id:string, @Res() res:Response):Promise<void>{
        await this.productService.delete_product(id)
        res.redirect(302, '/dashboard/product')
    }

    @Get('update/:id')
    @Render('admin/product/update-product')
    async get_update(@Param('id') id:string){
        const product = await this.productService.get_product(id)
        const categories = await this.categoryService.get_all_category()
        return {
            title: 'Emlak Güncelle',
            product: product[0],
            categories: categories
        }
    }

    @Post('update/:id')
    @UseInterceptors(FilesInterceptor('images', 10, {
        dest: 'src/assets/public/uploads'
    }))
    async post_update_product(@Body() data:any, @UploadedFiles()  files: MemoryStorageFile[], @Param('id') id:string, @Res() res:Response){

        if (files || files.length > 0){
            data.images = files
        }
        data.images = []

        await this.productService.update_product(id, data)
        res.redirect(302, '/dashboard/product')
    }

    @Get('image/delete/:id')
    async get_product_image_delete(@Param('id') id:any, @Res() res:Response){
        await this.productService.product_image_delete(id)
        res.redirect(302, '/dashboard/product')
    }
}
