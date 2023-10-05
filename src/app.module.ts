import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { CategoryAdminModule } from './category/admin/category.admin.module';
import { PrismaService } from './customService/prisma.service';
import { ProductAdminModule } from './product/admin/product.admin.module';
import { CategoryService } from './category/category.service';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from './customService/jwt.service';
import { LoginInterceptors } from './customService/login.interceptors';
import { UserModule } from './user/user.module';
import { ProductService } from './product/product.service';
import { VisitorService } from './customService/visitor.service';
import { ProductModule } from './product/product.module';
import { NavMiddleware } from './customService/nav.middleware';
import { LanguageAdminModule } from './language/language.admin.module';
import { LanguageService } from './language/language.service';
import { I18nInterceptors } from './i18n/i18n.interceptors';
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { CacheModule } from '@nestjs/cache-manager';
import { CategoryModule } from './category/category.module';

@Global()
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true
    }),
    CategoryAdminModule,
    ProductAdminModule,
    UserModule,
    ProductModule,
    LanguageAdminModule,
    CategoryModule,
    ConfigModule.forRoot({
      isGlobal : true,
      envFilePath: '.env'

    }),
    RouterModule.register(
      [
        {
          path: 'dashboard',
          module: CategoryAdminModule
        },
        {
          path: 'dashboard',
          module: ProductAdminModule
        },
        {
          path: 'dashboard',
          module: LanguageAdminModule
        }
      ]
    ),
    I18nModule.forRoot({
      fallbackLanguage: 'tr',
      loaderOptions: {
        path: path.join(__dirname, '..', 'src/i18n/'),
        watch: true,
      },
      resolvers: [
        {use:QueryResolver, options: ['lang']},
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang'])
      ],
      
    })
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    PrismaService, 
    CategoryService, 
    JwtService,
    CategoryService,
    ProductService,
    VisitorService,
    LanguageService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoginInterceptors
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: I18nInterceptors
    }
  ],
  exports: [PrismaService, CategoryService, JwtService, CategoryService, ProductService]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(NavMiddleware)
      .forRoutes('/*')
  }
}
