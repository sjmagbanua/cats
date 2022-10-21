import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { LocalAuthGuard } from "./auth/local-auth.guard";


@Controller()
export class AppController {
    constructor(private readonly authService: AuthService) {}

    //POST LOGIN
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req): any {
      return this.authService.login(req.user);
    }
    
    //GET PROTECTED
    @UseGuards(JwtAuthGuard)
    @Get('protected')
    getHello(@Request() req): string {
        return req.user;
    }
}