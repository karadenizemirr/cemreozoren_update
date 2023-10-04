import { Global, Module } from '@nestjs/common';
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

@Global()
@Module({
  imports: [
    CategoryAdminModule,
    ProductAdminModule,
    UserModule,
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
        }
      ]
    )
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    PrismaService, 
    CategoryService, 
    JwtService,
    CategoryService,
    ProductService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoginInterceptors
    }
  ],
  exports: [PrismaService, CategoryService, JwtService]
})
export class AppModule {}
