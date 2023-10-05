import { FilesInterceptor, UploadedFiles, MemoryStorageFile, DiskStorageFile } from '@blazity/nest-file-fastify';
import { Body, Controller, Get, Param, Post, Render, Req, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { CategoryService } from "src/category/category.service";
import { ProductService } from '../product.service';
import { Response } from 'express';
import { Language, Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { LanguageService } from 'src/language/language.service';

@Controller('product')
@UseGuards(AuthGuard)
export class ProductAdminController {
    constructor(private categoryService: CategoryService, private productService: ProductService, private languageService: LanguageService) { }

    @Get()
    @Render('admin/product/product')
    async get_product() {
        const products = await this.productService.get_all_product();
        return {
            title: 'Emlaklar',
            products: products
        }
    }

    // Add Product Operations
    @Get('add')
    @Render('admin/product/add-product')
    async get_add_product() {
        const categories = await this.categoryService.get_all_category();
        const languages = await this.languageService.get_all_language();

        return {
            title: 'Emlak Ekle',
            categories: categories,
            languages: languages
        }
    }
    @Post('add')
    @UseInterceptors(FilesInterceptor('propert_images', 20, {
        dest: 'src/assets/public/uploads',
        limits: {
            fileSize: 1024 * 1024 * 10,
            
        },
    }))
    async post_add_product(@Body() data: any, @Res() res: Response, @Req() req:Request, @UploadedFiles() files: MemoryStorageFile[]) {
        data.images = files
        await this.productService.create_product(data);
        res.redirect(302, '/dashboard/product')
    }

    @Get('delete/:id')
    async get_delete(@Param('id') id: string, @Res() res: Response): Promise<void> {
        await this.productService.delete_product(id)
        res.redirect(302, '/dashboard/product')
    }

    @Get('update/:id')
    @Render('admin/product/update-product')
    async get_update(@Param('id') id: string) {
        const product = await this.productService.get_product(id)
        const categories = await this.categoryService.get_all_category()
        const languages = await this.languageService.get_all_language()
        return {
            title: 'Emlak Güncelle',
            product: product[0],
            categories: categories,
            languages: languages
        }
    }

    @Post('update/:id')
    @UseInterceptors(FilesInterceptor('images', 10, {
        dest: 'src/assets/public/uploads'
    }))
    async post_update_product(@Body() data: any, @UploadedFiles() files: MemoryStorageFile[], @Param('id') id: string, @Res() res: Response) {
        data.images = []
        if (files || files.length > 0) {
            data.images = files
        }


        await this.productService.update_product(id, data)
        res.redirect(302, '/dashboard/product')
    }

    @Get('image/delete/:id')
    async get_product_image_delete(@Param('id') id: any, @Res() res: Response) {
        await this.productService.product_image_delete(id)
        res.redirect(302, '/dashboard/product')
    }
}
