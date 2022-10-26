import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { Task, User } from "@prisma/client";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { UsersService } from "./users/users.service";

@Controller('users')
export class AppController {
    constructor(
      private readonly authService: AuthService,
      private readonly userService: UsersService,
      ) {}

    // POST LOGIN
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req): any {
      return this.authService.login(req.user);
    }
    
    // GET PROTECTED
    @UseGuards(JwtAuthGuard)
    @Get('protected')
    getHello(@Request() req): string {
        return req.user;
    }

    //create User
    @Post('create')
    async signupUser(
      @Body() userData: { email: string, name: string, username: string, password: string },
    ): Promise<User> {
      return this.userService.createUsers(userData);
    }

    //get all Users
    @Get()
    findAll() {
      return this.userService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
      console.log(typeof id);
      return this.userService.findById(parseInt(id));
    } 
    
    //update users    
    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() userdetails: { email: string; name: string; username: string; password: string; },
    ): Promise<User> {
      const { email, name, username, password } = userdetails;
      return this.userService.update({
        where: { id: Number(id)},
        data: { email: String(email), name: String(name), username: String(username), password: String(password)},
      });
    }

    //delete userID
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<User> {
      return this.userService.remove({ id: Number(id) });
    }
}       