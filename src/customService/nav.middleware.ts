import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { Cache } from "cache-manager";
import { NextFunction, Request, Response } from "express";
import { CategoryService } from "src/category/category.service";
import { ProductService } from "src/product/product.service";


@Injectable()
export class NavMiddleware implements NestMiddleware {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager:Cache
    ) {}
    async use(req: Request, res: Response, next: NextFunction) {
        next()
    }
}