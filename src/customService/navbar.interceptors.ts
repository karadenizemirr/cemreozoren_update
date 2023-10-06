import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { CategoryService } from "src/category/category.service";
import { LanguageService } from "src/language/language.service";
import { ProductService } from "src/product/product.service";

@Injectable()
export class NavbarInterceptors implements NestInterceptor{
    constructor(
        private categoryService: CategoryService,
        private productService: ProductService,
        private languageService: LanguageService,
        @Inject('CACHE_MANAGER') private cacheManager: any
    ) {
    }
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const response = context.switchToHttp().getResponse();
        const request = context.switchToHttp().getRequest();

        if (!request.url.includes('dashboard')){
            const category_with_product = await this.categoryService.category_with_product();
            const products = await this.productService.get_all_product();
            const languages = await this.languageService.get_all_language();
            const edit_location = []

            for (const _ of category_with_product){
                for (const i of _.products){
                    if (!edit_location.includes(i.location.city)){
                        edit_location.push(i.location.city)
                    }
                }
            }

            response.locals.edit_location = edit_location
            response.locals.language = languages
            response.locals.products = products
            response.locals.category_with_product = category_with_product
        }

        return next.handle();
    }
}