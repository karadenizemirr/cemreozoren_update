import { Module } from "@nestjs/common";
import { LanguageAdminController } from "./language.admin.controller";
import { LanguageService } from "./language.service";

@Module({
    controllers: [LanguageAdminController],
    providers: [LanguageService],
    exports: [],
})
export class LanguageAdminModule {
    
}