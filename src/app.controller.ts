import { Body, Controller, Get, Inject, Param, Post, Render, Res, Session, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CategoryService } from './category/category.service';
import { ProductService } from './product/product.service';
import { VisitorService } from './customService/visitor.service';
import { AuthGuard } from './auth/auth.guard';
import { Response } from 'express';
import { LanguageService } from './language/language.service';
import * as secureSession from '@fastify/secure-session'
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private visitorService: VisitorService,
    private languageService: LanguageService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  @Get()
  @Render('index')
  async getHello(@Res() res: Response, @Session() session: secureSession.Session) {
    return {
      title: 'Anasayfa',
    }
  }

  @Get('dashboard')
  @Render('admin/dashboard')
  @UseGuards(AuthGuard)
  async get_dashboard() {

    const visitors = await this.visitorService.getAllVisit()
    const total_product = (await this.productService.get_all_product()).length

    return {
      title: 'Dashboard',
      visitors: visitors[0],
      total_product: total_product
    }
  }

  @Post('search')
  @Render('search')
  async post_search(@Body() data: any, @Res() res: Response) {
    const result = await this.productService.product_search(data.category, data.location, data.search)
    return {
      title: 'Arama Sonuçları',
      result: result
    }
  }

  @Get('404')
  @Render('notfound')
  async get_notfound() {
    return {
      title: 'Sayfa Bulunamadı'
    }
  }

  @Get('language/:lang')
  async get_tr(@Session() session: secureSession.Session, @Param('lang') lang: string, @Res() res: Response) {
    session.set('lang', lang)
    res.redirect(302, '/')
  }

}
